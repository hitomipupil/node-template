import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';
import { registerUser } from '../models/user.js';

const userControllers = {
    register: async (req, res) => {
        const { username, password } = req.body;
        await registerUser(username, password);
        res.status(200).json({
            message: 'User registered successfully'
        });
    },

    login: async (req, res) => {
        // receive username and password
        const { username, password } = req.body;
        if (
            // check if there's that info in the user table
        ) // if yes, issue JWT
         {
            const token = jwt.sign({ user: req.body.username }, secretKey);
            res.json({ token });
            return;
        }
        // if not, say info is wrong
        res.status(404).json({ error: 'Incorrect username or password' });
    return;
    },

    logout: async (req, res) => {},
};

export default userControllers;
