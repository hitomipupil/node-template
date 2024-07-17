import query from '../config/db.js';

const createUserTable = async () => {
    try {
        const queryStr = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password varchar(30) NOT NULL
);`
        await query(queryStr)
    } catch (err) {
        console.error('Error creating user table:', err);
    }
};

export const registerUser = async (username, password) => {
    try {
        const queryStr = `INSERT INTO users (username, password) VALUES(?, ?);`
            const user = await query(queryStr, [username, password]);
            return user;
    } catch (err) {}
}

export default createUserTable;
