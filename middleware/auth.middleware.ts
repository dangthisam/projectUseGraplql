import { Request, Response ,NextFunction } from "express";
import User from '../models/user.model.js'; // Adjust the path as necessary

const authMiddleware = async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
    // Middleware logic here
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = await User.findOne({ token: token, deleted: false }).select('-password');
        if (user) {
            req['user'] = user;
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
};

export default authMiddleware;
