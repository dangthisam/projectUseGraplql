import express , { Request, Response } from 'express';
import Article from './models/articles.model';

import connect from './config/connect-db';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

connect();


app.get('/articles', async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ deleted: false });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
});




app.listen(PORT, () => {  console.log(`Server is running on http://localhost:${PORT}`);
});


