/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getIngredients } from '../../api/ingredientData';
import { useAuth } from '../../utils/context/authContext';
import IngredientTable from '../../components/IngredientTable';

function IngredientsPage() {
  // Set a state for ingredients
  const [ingredients, setIngredients] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the ingredients
  const getAllTheIngredients = () => {
    getIngredients(user.uid).then(setIngredients);
  };

  // make the call to the API to get all the ingredients on component render
  useEffect(() => {
    getAllTheIngredients();
  }, []);

  return (
    <div className="text-center my-4">
      <Table striped bordered hover>
        {/* map over ingredients here using IngredientCard component */}
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <IngredientTable key={ingredient.firebaseKey} ingredientObj={ingredient} onUpdate={getAllTheIngredients} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IngredientsPage;
