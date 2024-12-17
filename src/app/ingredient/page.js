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
  const [sortColumn, setSortColumn] = useState('name'); // Default sort column
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // Function to fetch all ingredients from the API
  const fetchIngredients = () => {
    getIngredients(user.uid).then((data) => {
      // Sort the data initially based on the default sort column and direction
      const sortedData = data.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === 'asc' ? -1 : 1;
        } if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === 'asc' ? 1 : -1;
        } 
          return 0;
        
      });
      setIngredients(sortedData);
    });
  };

  // Sort ingredients whenever `sortColumn` or `sortDirection` changes
  useEffect(() => {
    if (sortColumn) {
      const sortedData = [...ingredients].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === 'asc' ? -1 : 1;
        } if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === 'asc' ? 1 : -1;
        } 
          return 0;
        
      });
      setIngredients(sortedData);
    }
  }, [sortColumn, sortDirection]);

  // Fetch ingredients on initial render
  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Sort by new column
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="ingTable text-center my-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Ingredient</th>
            <th onClick={() => handleSort('qty')}>Qty</th>
            <th aria-label="crud" className="btn-cell" />
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <IngredientTable key={ingredient.firebaseKey} ingredientObj={ingredient} onUpdate={fetchIngredients} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IngredientsPage;
