import express , { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { buildSchema } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.get('/articles', (req: Request, res: Response) => {
  res.json({
    message: 'Hello, this is the articles endpoint!'
  });
});




app.listen(PORT, () => {  console.log(`Server is running on http://localhost:${PORT}`);
});


