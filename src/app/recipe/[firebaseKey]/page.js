'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleRecipe } from '../../../api/recipeData';
import { getRecipeIngredients } from '../../../api/recipeIngredientData';
import { getIngredients } from '../../../api/ingredientData';
import { useAuth } from '../../../utils/context/authContext';

export default function RecipeDetailPage({ params }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]); // State for ingredients with names
  const { firebaseKey } = params; // Recipe ID
  const { user } = useAuth();

  useEffect(() => {
    // Fetch recipe details
    getSingleRecipe(firebaseKey).then(setRecipe);

    // Fetch join table data (recipeIngredients) and ingredient data
    getRecipeIngredients(firebaseKey).then((ingredientsData) => {
      getIngredients(user.uid).then((allIngredients) => {
        // Build a lookup table for ingredients by their firebaseKey
        const ingredientLookup = allIngredients.reduce((acc, ingredient) => {
          acc[ingredient.firebaseKey] = ingredient.name; // Map firebaseKey to name
          return acc;
        }, {});

        // Map over recipeIngredients to include the name from the lookup table
        const ingredientsWithNames = ingredientsData.map((ingredient) => ({
          ...ingredient,
          name: ingredientLookup[ingredient.ingredientId] || 'Unknown Ingredient', // Default to avoid undefined
        }));

        setIngredients(ingredientsWithNames);
      });
    });
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
            {ingredient.name} - Quantity: {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h3 className="header">Instructions</h3>
      <hr />
      <p className="whiteTextOutlined background keepFormat">{recipe.instructions}</p>
    </div>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
