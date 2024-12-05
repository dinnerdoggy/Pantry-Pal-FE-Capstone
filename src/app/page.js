/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipeData';
import { useAuth } from '../utils/context/authContext';
import RecipeCard from '../components/RecipeCard';

function Home() {
  // Set a state for recipes
  const [recipes, setRecipes] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the recipes
  const getAllTheRecipes = () => {
    getRecipes(user.uid).then(setRecipes);
  };

  // make the call to the API to get all the recipes on component render
  useEffect(() => {
    getAllTheRecipes();
  }, []);

  return (
    <div className="text-center my-4">
      <div className=" mainPage d-flex flex-wrap">
        {/* map over recipes here using RecipeCard component */}
        {recipes.map((recipe) => (
          <RecipeCard className="border" key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getAllTheRecipes} />
        ))}
      </div>
    </div>
  );
}

export default Home;
