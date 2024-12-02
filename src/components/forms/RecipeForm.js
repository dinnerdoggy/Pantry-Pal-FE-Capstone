'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../api/recipeData';
import ingredientsArray from '../../utils/sample-data/ingredientsArray.json';

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
  const router = useRouter();
  const { user } = useAuth();

  // Load ingredients on component mount
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, userId: user.uid };

    if (obj.firebaseKey) {
      // Update Recipe
      updateRecipe(payload).then(() => {
        router.push(`/recipe/${obj.firebaseKey}`);
      });
    } else {
      // Create Recipe
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
      <br />
      {/* INGREDIENTS */}
      <Form.Label controlId="floatingSelect" label="Ingredients">
        <Form.Select aria-label="Ingredients" name="ingredientName" onChange={handleChange} className="mb-3" value={formInput.ingredientName} required>
          <option value="">Choose Ingredient</option>
          {ingredientsArray.map((story) => (
            <option key={story.id} value={story.ingredientName}>
              {story.ingredientName}
            </option>
          ))}
        </Form.Select>
      </Form.Label>
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
