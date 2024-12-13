'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleIngredient } from '@/api/ingredientData';
import IngredientForm from '@/components/forms/IngredientForm';

export default function UpdateIngredientPage({ params }) {
  const [editItem, setEditItem] = useState({});
  // grab the firebasekey
  const { firebaseKey } = params;

  // make a call to the API to get the recipe data
  useEffect(() => {
    getSingleIngredient(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return <IngredientForm obj={editItem} />;
}

UpdateIngredientPage.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
