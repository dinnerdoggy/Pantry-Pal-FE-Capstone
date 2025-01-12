# Pantry Pal [![Netlify Status](https://api.netlify.com/api/v1/badges/5b475e36-dac6-4812-b22b-6501d97db6e0/deploy-status)](https://app.netlify.com/sites/caseys-pantry-pal/deploys)

## Overview
Pantry Pal is a user-friendly application for creating, viewing, updating, and managing recipes. Users can log in with Google authentication and seamlessly manage their favorite recipes.

[View App Here](https://caseys-pantry-pal.netlify.app/)

## About the User <!-- This is a scaled down user persona -->
- **Ideal User**: This app is perfect for food enthusiasts that want an easy way to decide what to cook.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- **Google Authentication**: Securely log in and access your recipes.
- **View Recipes**: Browse a list of recipes on the main page.
- **Recipe Details**: Click on a recipe to view its full details, including ingredients and instructions.
- **Add Recipes**: Use the "Add a Recipe" button in the navbar to create a new recipe.
- **Edit Recipes**: Update recipe information by clicking the "Edit" button on a recipe card.
- **Delete Recipes**: Remove unwanted recipes using the "Delete" button on the recipe card.

## Screenshots
### Sign in
![image](https://github.com/user-attachments/assets/6ce21f52-0e16-4e88-9125-6c46843c5746)


### Read Recipes
![image](https://github.com/user-attachments/assets/48d75699-20ba-4aeb-b821-2c08ab73f9eb)
![image](https://github.com/user-attachments/assets/d02a8c04-0450-41bd-8796-4b19a2e409a9)


### Create / Update Form
![image](https://github.com/user-attachments/assets/c76212ef-3d22-46f8-a618-315803ba56ff)
![image](https://github.com/user-attachments/assets/ad5db76c-3ba7-4eda-8162-8afb7231e4f9)


## Video Walkthrough of Recipe App <!-- A loom link is sufficient -->
https://www.loom.com/share/2514808886e74c13aa289ccb4e850920

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](https://caseys-pantry-pal.netlify.app/)
- [Wireframe](https://www.dropbox.com/scl/fi/o6st4gwnk7b3hkuld1rjj/pantrypalwireframe.drawio.png?rlkey=ppib5cfjbqorta9s0rot98isy&st=ikmwx6wn&dl=0)
- [ERD](https://dbdiagram.io/d/Pantry_Pal-673516d9e9daa85aca5e5063)
- [Project Board](https://github.com/users/dinnerdoggy/projects/1/views/1)

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
```
## Contributors
[Casey Cunningham](github.com/dinnerdoggy)
