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

export { getRecipes, deleteRecipe };
