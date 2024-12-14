'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { useAuth } from '../../utils/context/authContext';
import { getIngredients } from '../../api/ingredientData';
import { createRecipe, updateRecipe } from '../../api/recipeData';
import { createRecipeIngredients, getRecipeIngredients, updateRecipeIngredients } from '../../api/recipeIngredientData';

const initialState = {
  createdAt: '',
  image: '',
  instructions: '',
  name: '',
  updatedAt: '',
  userId: '',
};

function RecipeForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientLines, setIngredientLines] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // Load ingredients and recipe ingredients on component mount
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);

    getIngredients(user.uid).then((data) => {
      const ingredientOptions = data.map((ingredient) => ({
        value: ingredient.firebaseKey,
        label: ingredient.name,
      }));
      setIngredients(ingredientOptions);
    });

    if (obj.firebaseKey) {
      getRecipeIngredients(obj.firebaseKey).then((data) => {
        const lines = data.map((ri) => ({
          firebaseKey: ri.firebaseKey, // Include firebaseKey here
          ingredient: ri.ingredientId,
          qty: ri.quantity,
        }));
        setIngredientLines(lines);
      });
    } else {
      setIngredientLines([{ ingredient: '', qty: '' }]);
    }
  }, [obj, user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredientLines = [...ingredientLines];
    newIngredientLines[index] = { ...newIngredientLines[index], [name]: value };
    setIngredientLines(newIngredientLines);
  };

  const handleSelectChange = (index, selectedOption) => {
    const newIngredientLines = [...ingredientLines];
    newIngredientLines[index].ingredient = selectedOption ? selectedOption.value : '';
    setIngredientLines(newIngredientLines);
  };

  const addIngredientLine = () => {
    setIngredientLines([...ingredientLines, { ingredient: '', qty: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, userId: user.uid };

    if (obj.firebaseKey) {
      // Update recipe
      updateRecipe(payload).then(() => {
        ingredientLines.forEach((line) => {
          const { firebaseKey, recipeId, ingredient, qty } = line;
          if (ingredient) {
            if (firebaseKey) {
              updateRecipeIngredients({
                firebaseKey,
                recipeId,
                ingredientId: ingredient,
                quantity: qty,
              });
            } else {
              createRecipeIngredients({
                recipeId: obj.firebaseKey,
                ingredientId: ingredient,
                quantity: qty,
              }).then((data) => {
                const patchRiPaylod = { firebaseKey: data.name };
                updateRecipeIngredients(patchRiPaylod);
              });
            }
          }
        });
        router.push(`/recipe/${obj.firebaseKey}`);
      });
    } else {
      // Create recipe
      createRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => {
          const recipeId = name;
          ingredientLines.forEach((line) => {
            const { ingredient, qty } = line;
            if (ingredient) {
              createRecipeIngredients({
                recipeId,
                ingredientId: ingredient,
                quantity: qty,
              }).then((data) => {
                const patchRiPaylod = { firebaseKey: data.name };
                updateRecipeIngredients(patchRiPaylod);
              });
            }
          });
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="display-flex-column centerAll text-black">
      <h2 className="header mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Recipe</h2>

      {/* Recipe Name */}
      <Form.Label controlId="floatingInput1" label="Recipe Name" className="border mb-3">
        <Form.Control type="text" placeholder="Recipe Name" name="name" value={formInput.name} onChange={handleChange} required />
      </Form.Label>

      {/* Ingredients */}
      {ingredientLines.map((line, index) => (
        <div key={line.firebaseKey} className="d-flex mb-3">
          <Select className="flex-grow-1" options={ingredients} placeholder="Select an ingredient" onChange={(selectedOption) => handleSelectChange(index, selectedOption)} value={ingredients.find((ingredient) => ingredient.value === line.ingredient) || null} />
          <Form.Label controlId={`ingredientQty${index}`} label="Quantity" className="mb-3">
            <Form.Control type="number" placeholder="Quantity" name="qty" value={line.qty} onChange={(e) => handleIngredientChange(index, e)} />
          </Form.Label>
        </div>
      ))}
      <Button type="button" onClick={addIngredientLine} variant="secondary" className="copy-btn">
        Add Another Ingredient
      </Button>
      <br />

      {/* Image Url */}
      <Form.Label controlId="floatingInput2" label="Recipe Image" className="border mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </Form.Label>
      <br />

      {/* Instructions */}
      <Form.Label controlId="exampleForm.ControlTextarea1" label="Instructions" className="border mb-3">
        <Form.Control style={{ height: 'auto', minHeight: '150px' }} as="textarea" rows={20} placeholder="Instructions" name="instructions" value={formInput.instructions} onChange={handleChange} required />
      </Form.Label>
      <br />
      <Button className="copy-btn" type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} Recipe
      </Button>
    </Form>
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

export default RecipeForm;
