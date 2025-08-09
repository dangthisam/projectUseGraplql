import express from 'express';
import connect from './config/connect-db.js';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@as-integrations/express5"
import resolvers from './resolve/index.resolve.js';
import cors from 'cors';
import typeDefs from './typeDefs/index.typeDefs.js';
import bodyParser from 'body-parser';
import authMiddleware from './middleware/auth.middleware.js';

const startServer = async () => {
    dotenv.config();
    const PORT = process.env.PORT || 8080;
    const app = express();

    // Kết nối database
    connect();

    // Tạo Apollo Server (không cần context ở đây nữa)
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
        introspection: true,
    });

    await server.start();

    // Apply auth middleware trước GraphQL endpoint
    app.use("/graphql", authMiddleware);

    // Sử dụng middleware của Apollo Server với Express
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server, {
            // Context function được định nghĩa ở đây
            context: async ({ req, res }) => {
                // req đã được xử lý bởi authMiddleware
                // Có thể truy cập user info từ req nếu auth middleware đã set
                return { 
                    req, 
                    res,
                 
                };
            },
        })
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