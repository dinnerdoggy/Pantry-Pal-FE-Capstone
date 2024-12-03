'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleRecipe } from '../../../api/recipeData';
import { getRecipeIngredients } from '../../../api/recipeIngredientData';

export default function RecipeDetailPage({ params }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const { firebaseKey } = params;

  useEffect(() => {
    // Fetch recipe details
    getSingleRecipe(firebaseKey).then(setRecipe);

    // Fetch associated ingredients
    getRecipeIngredients(firebaseKey).then((ingredientsData) => {
      setIngredients(ingredientsData);
    });
  }, [firebaseKey]);

  return (
    <>
      <h1>{recipe.name}</h1>
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{ height: '400px', width: '400px' }} />
      <h3>Ingredients</h3>
      <hr />
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.firebaseKey}>
            Ingredient ID: {ingredient.ingredientId}, Quantity: {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <hr />
      <p>{recipe.instructions}</p>
    </>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
