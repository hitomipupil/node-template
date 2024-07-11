import query from '../config/db.js';

const createRecipeTable = async () => {
    try {
        const queryStr = `CREATE TABLE recipes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    image TEXT,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id)
    );`
        await query(queryStr)
    } catch (err) {}
};

export const createRecipe = async (title, description, image, user_id) => {
    try {
        const queryStr = `INSERT INTO Recipe.recipes
    (title, description, image, user_id)
    VALUES(?, ?);`
        const recipe = await query(queryStr, [title, description, image, user_id])
        return recipe;
    } catch (err) {}
};

export const updateRecipe = async (title, description, image, user_id, id) => {
    try {
        const queryStr = `UPDATE Recipe.recipes
    SET title=?, description=?, image=?, user_id=?
    WHERE id=?;`
    const recipe = await query(queryStr, [title, description, image, user_id, id])
    return recipe;
    } catch (err) {}
};

export const deleteRecipe = async (id) => {
    try {
        const queryStr = `DELETE FROM Recipe.recipes
WHERE id=?;`
    const recipe = await query(queryStr, id)
    return recipe;
    } catch (err) {}
};

export const getRecipeById = async (id) => {
    try {
        const queryStr = `SELECT *
        FROM Recipe.recipes
        WHERE id=?;`
        const recipe = await query(queryStr, id)
        return recipe;
    } catch (err) {}
};

export const listRecipes = async () => {
    try {
        const queryStr = `SELECT *
FROM Recipe.recipes;`
const recipe = await query(queryStr)
return recipe;
    } catch (err) {}
};

export default createRecipeTable;