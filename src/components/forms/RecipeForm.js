'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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
      const ingredientOptions = data.map((ingredient) => ({
        value: ingredient.firebaseKey,
        label: ingredient.name,
      }));
      setIngredients(ingredientOptions);
    });
  }, [obj, user]);

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
      <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
        <Form.Control type="text" placeholder="Recipe Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      {/* INGREDIENTS SELECT FIELDS */}
      {ingredientLines.map((line, index) => (
        <div key={obj.firebaseKey} className="d-flex mb-3">
          <Select className="me-3" options={ingredients} placeholder="Select an ingredient" onChange={(selectedOption) => handleSelectChange(index, selectedOption)} value={ingredients.find((ingredient) => ingredient.value === line.ingredient) || null} />
          <FloatingLabel controlId={`ingredientQty${index}`} label="Quantity" className="flex-grow-1">
            <Form.Control type="number" placeholder="Quantity" name="qty" value={line.qty} onChange={(e) => handleIngredientChange(index, e)} />
          </FloatingLabel>
        </div>
      ))}
      {/* ADD MORE INGREDIENT FIELDS BUTTON */}
      <Button type="button" onClick={addIngredientLine} variant="secondary" className="mb-3">
        Add Another Ingredient
      </Button>
      {/* RECIPE IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Recipe Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>
      {console.log('!!!!!!!!!!!!!!!!', ingredientLines)};{/* RECIPE INSTRUCTIONS */}
      <FloatingLabel controlId="exampleForm.ControlTextarea1" label="Instructions" className="mb-3">
        <Form.Control style={{ height: 'auto', minHeight: '150px' }} as="textarea" rows={20} placeholder="Instructions" name="instructions" value={formInput.instructions} onChange={handleChange} required />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</Button>
    </Form>
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

export default RecipeForm;
