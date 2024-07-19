import express from 'express';
import cookieParser from 'cookie-parser';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import createUserTable from './models/user.js';
import createRecipeTable from './models/recipe.js';

// import routes
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';

// set port
const PORT = process.env.PORT;

// Construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(PATH, 'public')));

// create tables
await createUserTable();
await createRecipeTable();

// use routes
app.use(userRoutes);
app.use(recipeRoutes);

// Secret key for JWT signing and verification
const secretKey = process.env.SECRET_KEY;

// JWT middleware for verifying tokens
app.use(
    expressjwt({ secret: secretKey, algorithms: ['HS256'], getToken: req => req.cookies.token }).unless({
        path: ['/login', '/register']
    })
);

// error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
