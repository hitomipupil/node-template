import { createRecipe, deleteRecipe, getRecipeById, listRecipes, updateRecipe } from '../models/recipe.js';
import { getUserByUsername } from '../models/user.js';

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
        const { title, description, image } = req.body;
        const user = await getUserByUsername(req.username);
        const insertRecipe = await createRecipe(title, description, image, user.id);
        const recipe = await getRecipeById(insertRecipe.insertId);
        res.status(200).json({
            recipe
        });
    },
    updateRecipe: async (req, res) => {
        try{
        const { id } = req.params;
        //fetch the recipebyid
        const recipe = await getRecipeById(id);
        //fetch the userid,
        const user = await getUserByUsername(req.username);
        const { title, description, image, } = req.body;
        if(recipe.user_id = user.id){
        await updateRecipe(title, description, image, user.id, id);
        }
        // fetch again the new recipe
        const newRecipe = await getRecipeById(id);
        res.status(200).json({
            newRecipe
        });
    } catch (err){
        console.error(err);
    }
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        await deleteRecipe(id);
        res.status(200).json();
    },
};

export default recipeControllers;
