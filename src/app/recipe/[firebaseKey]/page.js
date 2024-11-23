'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleRecipe } from '../../../api/recipeData';

export default function RecipeDetailPage({ params }) {
  const [recipe, setRecipe] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setRecipe);
  }, [firebaseKey]);

  return (
    <>
      <h1>{recipe.name}</h1>
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{ height: '400px', width: '400px' }} />
      <h3>Ingredients</h3>
      <hr />
      <h3>Instructions</h3>
      <hr />
      <p>{recipe.instructions}</p>
    </>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
