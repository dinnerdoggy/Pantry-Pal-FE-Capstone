'use client';

import React, { useEffect, useState } from 'react';
import { getSingleRecipe } from '@/api/recipeData';
import RecipeForm from '@/components/forms/RecipeForm';
import PropTypes from 'prop-types';

export default function UpdateRecipePage({ params }) {
  const [editItem, setEditItem] = useState({});
  // grab the firebasekey
  const { firebaseKey } = params;

  // make a call to the API to get the recipe data
  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return <RecipeForm obj={editItem} />;
}

UpdateRecipePage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
