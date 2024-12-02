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
![image](https://github.com/user-attachments/assets/15521a2f-13fd-4437-94c2-84f012b907c3)

### Read Recipes
![image](https://github.com/user-attachments/assets/dbb05d20-8c97-45b1-b675-bf6a22492415)
![image](https://github.com/user-attachments/assets/b7e01932-cbdd-4045-920a-c0e805ad1072)

### Create / Update Form
![image](https://github.com/user-attachments/assets/1de30ef6-22fa-4876-86cc-1dc58740d793)
![image](https://github.com/user-attachments/assets/881a8b29-1216-478a-b72d-20493dbc3aa4)

## Video Walkthrough of Recipe App <!-- A loom link is sufficient -->
https://www.loom.com/share/829b90d831ea441ba2db6bea724af210

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
