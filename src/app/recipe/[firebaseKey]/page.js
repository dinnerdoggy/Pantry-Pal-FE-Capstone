'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleRecipe } from '../../../api/recipeData';
import { getRecipeIngredients } from '../../../api/recipeIngredientData';
import { getSingleIngredient } from '../../../api/ingredientData';

export default function RecipeDetailPage({ params }) {
  const [recipe, setRecipe] = useState({}); // State for storing recipe details
  const [ingredients, setIngredients] = useState([]); // State for storing list of ingredients with details
  // const [ingredientNames, setIngredientNames] =useState()
  const { firebaseKey } = params; // Extracting the unique recipe ID from route parameters

  useEffect(() => {
    // Fetch recipe details
    getSingleRecipe(firebaseKey).then(setRecipe);

    // Fetch associated ingredients
    getRecipeIngredients(firebaseKey).then((ingredientsData) => {
      setIngredients(ingredientsData);
    });

    getSingleIngredient(); // I have to do something with this
  }, [firebaseKey]);

  return (
    <div className="display-flex-column centerAll" style={{ color: '#4F7E17' }}>
      <h1 className="header">{recipe.name}</h1>
      <Card.Img className="border" variant="top" src={recipe.image} alt={recipe.name} style={{ height: '400px', width: '400px' }} />
      <h3 className="header">Ingredients</h3>
      <hr />
      <ul className="whiteTextOutlined">
        {ingredients.map((ingredient) => (
          <li key={ingredient.firebaseKey}>
            Ingredient ID: {ingredient.ingredientId}, Quantity: {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h3 className="header">Instructions</h3>
      <hr />
      <p className="whiteTextOutlined background">{recipe.instructions}</p>
    </div>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
