'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleRecipe } from '../../../api/recipeData';
import { getRecipeIngredients } from '../../../api/recipeIngredientData';
import { getIngredients, updateIngredient } from '../../../api/ingredientData';
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
  }, [firebaseKey, user.uid]);

  const handleUseRecipe = () => {
    // Step 1: Fetch the ingredients associated with the recipe
    getRecipeIngredients(firebaseKey)
      .then((ingredientsData) => {
        // Step 2: For each ingredient in the recipeIngredients, update the ingredient's quantity
        const updatePromises = ingredientsData.map((ingredient) => {
          const {ingredientId} = ingredient; // The ID of the ingredient in the ingredients collection
          const quantityUsed = ingredient.quantity; // The quantity used from the recipe

          if (Number.isNaN(quantityUsed)) {
            return Promise.resolve(); // Skip this ingredient if the quantity is invalid
          }

          // Step 3: Fetch the current ingredient details
          return getIngredients(user.uid).then((allIngredients) => {
            const ingredientToUpdate = allIngredients.find((ing) => ing.firebaseKey === ingredientId);

            if (ingredientToUpdate) {
              const currentQty = parseInt(ingredientToUpdate.qty, 10); // Ensure qty is parsed as an integer

              if (Number.isNaN(currentQty)) {
                return Promise.resolve(); // Skip if the ingredient's quantity is invalid
              }

              const newQty = currentQty - quantityUsed; // Deduct the quantity

              // Use the updateIngredient function to update the ingredient
              return updateIngredient({
                ...ingredientToUpdate,
                qty: newQty, // Update the qty field
              });
            } 
              // Handle case where the ingredient is not found (optional)
              console.error('Ingredient not found:', ingredientId);
              return Promise.resolve(); // Skip this ingredient
            
          });
        });

        // Wait for all promises to resolve
        return Promise.all(updatePromises);
      })
      .catch((error) => {
        console.error('Error processing ingredients:', error);
      });
  };

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
      <Button onClick={handleUseRecipe} variant="success">
        Use Recipe
      </Button>
      <br />
      <Link href={`/recipe/edit/${recipe.firebaseKey}`} passHref>
        <Button variant="info">EDIT</Button>
      </Link>
      <br />
    </div>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
