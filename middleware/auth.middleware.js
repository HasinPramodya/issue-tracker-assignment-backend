import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function authUser(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (decoded != null) {
            req.user = decoded;
        }
    });
    next()
}