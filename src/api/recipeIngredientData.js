import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Recipe Ingredients
const getRecipeIngredients = (recipeId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipeIngredients.json?orderBy="recipeId"&equalTo="${recipeId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getIngredientById = (ingredientId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/ingredients/${ingredientId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// CREATE Recipe Ingredients
const createRecipeIngredients = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipeIngredients.json`, {
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

// UPDATE Recipe Ingredients
const updateRecipeIngredients = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipeIngredients/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getRecipeIngredients, getIngredientById, createRecipeIngredients, updateRecipeIngredients };
