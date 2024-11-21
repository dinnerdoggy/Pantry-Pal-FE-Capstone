import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeDetailPage({ params }) {
  return <div>Recipe Details Page TEST {params.firebaseKey}</div>;
}

RecipeDetailPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.number.isRequired,
  }).isRequired,
};
