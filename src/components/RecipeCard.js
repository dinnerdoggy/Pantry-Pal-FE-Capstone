'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteRecipe } from '../api/recipeData';

function RecipeCard({ recipeObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE RECIPE AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE RECIPES
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.title}?`)) {
      deleteRecipe(recipeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{recipeObj.title}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE RECIPE DETAILS  */}
        <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE RECIPE DETAILS  */}
        <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisRecipe} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
