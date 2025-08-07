import express from 'express';
import Article from './models/articles.model.js';
import connect from './config/connect-db.js';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import typeDefs from './typeDefs/index.typeDefs.js';
import resolvers from './resolve/index.resolve.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const startServer = async () => {
    
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Kết nối database
 connect();
    // Định nghĩa Article type trong schema
   



    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
    });

    await server.start();

    // Sử dụng middleware của Apollo Server với Express
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server)
    );
    // Khởi động server sau khi setup xong
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
};

// Gọi hàm startServer và xử lý lỗi
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});