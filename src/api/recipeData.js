import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Recipes
const getRecipes = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipe.json?orderBy="userId"&equalTo="${userId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET Single Recipe
const getSingleRecipe = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipe/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE Recipe
const createRecipe = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipe.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE Recipe
const updateRecipe = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipe/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE Recipe
const deleteRecipe = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipe/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe };
