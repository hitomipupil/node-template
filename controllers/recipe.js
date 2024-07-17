import { createRecipe, deleteRecipe, getRecipeById, listRecipes, updateRecipe } from '../models/recipe.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        const recipes = await listRecipes();
        res.status(200).json({
            recipes
        });
    }, 
    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        const recipe = await getRecipeById(id);
        res.status(200).json({
            recipe
        });
    },
    postRecipe: async (req, res) => {
        const { title, description, image, user_id } = req.body;
        const insertRecipe = await createRecipe(title, description, image, user_id);
        const recipe = await getRecipeById(insertRecipe.insertId);
        res.status(200).json({
            recipe
        });
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        // get body
        const { title, description, image, user_id } = req.body;
        // update
        await updateRecipe(title, description, image, user_id, id);
        // fetch again the new recipe
        const newRecipe = await getRecipeById(id);
        res.status(200).json({
            newRecipe
        });
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        await deleteRecipe(id);
        res.status(200).json();
    },
};

export default recipeControllers;
