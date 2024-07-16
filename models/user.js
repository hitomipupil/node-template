import query from '../config/db.js';

const createUserTable = async () => {
    try {
        const queryStr = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);`
        await query(queryStr)
    } catch (err) {}
};

export default createUserTable;
