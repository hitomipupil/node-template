import jwt from 'jsonwebtoken';


import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';
import { createUser, getUserByUsername } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const userControllers = {
    register: async (req, res) => {
        try {
            console.log('hi');
        const { username, password } = req.body;
        console.log(username,password);
        const hashedPassword = hashPassword(password);
        await createUser(username, hashedPassword);
        res.status(200).json({
            message: 'User registered successfully'
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
    },

    login: async (req, res) => {
        try{
        // receive username and password
        const { username, password } = req.body;
        // check if there's that info in the user table
        const user = await getUserByUsername(username);
        if (user && matchPasswords(password, user.password)) {
        const token = jwt.sign({ user: username }, secretKey);
        res.json({ token });
        } else {
        // if not, say info is wrong
        res.status(404).json({ error: 'Incorrect username or password' });
        }
        } catch (err) {
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    logout: async (req, res) => {
        res.status(200).json({ message: 'User logged out successfully' });
    },
};

export default userControllers;
