'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteRecipe } from '../api/recipeData';

function RecipeCard({ recipeObj, onUpdate }) {
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteRecipe(recipeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Link href={`/recipe/${recipeObj.firebaseKey}`} passHref>
      {' '}
      {/* Card is wrapped in a Link compomnent to make the whole card clickable for view details */}
      <Card style={{ width: '18rem', margin: '10px', border: '5px solid black' }}>
        <Card.Img className="cardImage" variant="middle" src={recipeObj.image} alt={recipeObj.name} style={{ height: '300px' }} />
        <Card.Body>
          <Card.Title>{recipeObj.name}</Card.Title>
          {/* DYNAMIC LINK TO EDIT THE RECIPE DETAILS  */}
          <Link href={`/recipe/edit/${recipeObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href="/">
            <Button variant="danger" onClick={deleteThisRecipe} className="deleteBtn">
              DELETE
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
