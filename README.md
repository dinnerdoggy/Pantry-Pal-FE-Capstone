# Pantry Pal [![Netlify Status](https://api.netlify.com/api/v1/badges/4ab7e730-7ed3-4cfd-a988-66195e79a991/deploy-status)](https://app.netlify.com/sites/drt-sortinghat/deploys)

Pantry Pal is a user-friendly application for creating, viewing, updating, and managing recipes. Users can log in with Google authentication and seamlessly manage their favorite recipes.

[View App](#your-link)

## Get Started <!-- OPTIONAL, but doesn't hurt -->
To get started with this app:
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.
4. Access the app locally at `http://localhost:3000`.

## About the User <!-- This is a scaled down user persona -->
- **Ideal User**: This app is perfect for food enthusiasts that want an easy way to decide what to cook.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- **Google Authentication**: Securely log in and access your recipes.
- **View Recipes**: Browse a list of recipes on the main page.
- **Recipe Details**: Click on a recipe to view its full details, including ingredients and instructions.
- **Add Recipes**: Use the "Add a Recipe" button in the navbar to create a new recipe.
- **Edit Recipes**: Update recipe information by clicking the "Edit" button on a recipe card.
- **Delete Recipes**: Remove unwanted recipes using the "Delete" button on the recipe card.

## Video Walkthrough of Recipe App <!-- A loom link is sufficient -->
https://www.loom.com/share/829b90d831ea441ba2db6bea724af210

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](#your-link)
- [Wireframes](#your-link)
- [Project Board](#your-link)

## Code Snippet <!-- OPTIONAL, but doesn't hurt -->
Here is a snippet to get recipes from the database:
```javascript
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
