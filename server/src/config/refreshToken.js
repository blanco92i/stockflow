import jwt from 'jsonwebtoken';
import User from '../models/User.js';


//genere un access token court terme
const generateAccessToken = (userId, role = 'user') => {
    return jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d", // court par sécurité
        }
    );
};

//genere un refresh token long terme
const generateRefreshToken = (userId, role = 'user') => {
    return jwt.sign(
        { id: userId, role },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "3d", // cohérent avec ton cookie
        }
    );
};

export {
    generateAccessToken,
    generateRefreshToken,
};