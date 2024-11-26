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
  const [ingredientLines, setIngredientLines] = useState([{ ingredient: '', qty: '' }]);
  const router = useRouter();
  const { user } = useAuth();

  // Load ingredients on component mount
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getIngredients(user.uid).then((data) => {
      // Fetches users owned ingredients.
      const ingredientOptions = data.map((ingredient) => ({
        // processes data to be compatible with select drop-down
        value: ingredient.firebaseKey, // assign the id to value to each index
        label: ingredient.name, // assign the name for display in the drop-down to each index
      }));
      setIngredients(ingredientOptions); // updates the state for use in the drop-down
    });
  }, [obj]); // including obj ensures the effect re-runs for updating a recipe

  // Update the forms state when the user types
  const handleChange = (e) => {
    // The event object is the form field. Input, textarea, etc.
    const { name, value } = e.target; // Destructuring to grab the name attribute of the form field, and the current value of the target
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
    if (obj.firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, userId: user.uid };
      createRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Recipe</h2>
      {/* RECIPE NAME INPUT  */}
      <Form.Label controlId="floatingInput1" label="Recipe Name" className="mb-3">
        <Form.Control type="text" placeholder="Recipe Name" name="name" value={formInput.name} onChange={handleChange} required />
      </Form.Label>
      {/* INGREDIENTS SELECT FIELDS */}
      {ingredientLines.map((line, index) => (
        <div key={obj.firebaseKey} className="d-flex mb-3">
          <Select className="flex-grow-1" options={ingredients} placeholder="Select an ingredient" onChange={(selectedOption) => handleSelectChange(index, selectedOption)} value={ingredients.find((ingredient) => ingredient.value === line.ingredient) || null} />
          <Form.Label controlId={`ingredientQty${index}`} label="Quantity" className="mb-3">
            <Form.Control type="number" placeholder="Quantity" name="qty" value={line.qty} onChange={(e) => handleIngredientChange(index, e)} />
          </Form.Label>
        </div>
      ))}
      {/* ADD MORE INGREDIENT FIELDS BUTTON */}
      <Button type="button" onClick={addIngredientLine} variant="secondary" className="mb-3">
        Add Another Ingredient
      </Button>
      <br />
      {/* RECIPE IMAGE INPUT  */}
      <Form.Label controlId="floatingInput2" label="Recipe Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </Form.Label>
      <br />
      {/* RECIPE INSTRUCTIONS */}
      <Form.Label controlId="exampleForm.ControlTextarea1" label="Instructions" className="mb-3">
        <Form.Control style={{ height: 'auto', minHeight: '150px' }} as="textarea" rows={20} placeholder="Instructions" name="instructions" value={formInput.instructions} onChange={handleChange} required />
      </Form.Label>
      <br />
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</Button>
    </Form>
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

export default RecipeForm;
