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

export { getIngredients, deleteIngredient };
