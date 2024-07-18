import query from '../config/db.js';

const createUserTable = async () => {
    try {
        const queryStr = `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );`;
        await query(queryStr);
    } catch (err) {
        console.error('Error creating user table:', err);
    }
};

export const createUser = async (username, password) => {
    try {
        const queryStr = `INSERT INTO users (username, password)
         VALUES(?, ?);`;
        const user = await query(queryStr, [username, password]);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Error registering user:', err);
        throw err;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const queryStr = 'SELECT * FROM users WHERE username = ?;'

            const [row] = await query(queryStr, [username]);
            return row;
    } catch (err) {
        console.error('Error logging in user:', err);
        throw err;
    }
}

export default createUserTable;
