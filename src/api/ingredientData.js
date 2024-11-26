import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Ingredients
const getIngredients = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/ingredient.json?orderBy="userId"&equalTo="${userId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET Single Ingredient
const getSingleIngredient = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Ingredient/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE Ingredient
const createIngredient = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/ingredient.json`, {
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

// UPDATE Ingredient
const updateIngredient = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/ingredient/${payload.firebaseKey}.json`, {
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

// DELETE Ingredient
const deleteIngredient = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/ingredient/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getIngredients, getSingleIngredient, createIngredient, updateIngredient, deleteIngredient };
