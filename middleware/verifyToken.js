import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            console.log(data);
            if (err) {
                res.status(498).json({ message: 'token is not valid' });
            }
            req.username = data.user;
            next();
        });
    } else {
        res.status(498).json({ message: 'token is not valid' });
    }
};

export default verifyToken;
