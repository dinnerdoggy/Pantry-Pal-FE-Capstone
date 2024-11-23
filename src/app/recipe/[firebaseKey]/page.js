'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleRecipe } from '../../../api/recipeData';

export default function RecipeDetailPage({ params }) {
  const [recipe, setRecipe] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setRecipe);
  }, [firebaseKey]);

  return (
    <>
      <h4>{recipe.name}</h4>
      <div>{firebaseKey}</div>
    </>
  );
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
