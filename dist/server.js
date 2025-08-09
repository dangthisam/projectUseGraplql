"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_db_js_1 = __importDefault(require("./config/connect-db.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const index_resolve_js_1 = __importDefault(require("./resolve/index.resolve.js"));
const cors_1 = __importDefault(require("cors"));
const index_typeDefs_js_1 = __importDefault(require("./typeDefs/index.typeDefs.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_middleware_js_1 = __importDefault(require("./middleware/auth.middleware.js"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const PORT = process.env.PORT || 8080;
    const app = (0, express_1.default)();
    (0, connect_db_js_1.default)();
    const server = new server_1.ApolloServer({
        typeDefs: index_typeDefs_js_1.default,
        resolvers: index_resolve_js_1.default,
        introspection: true,
    });
    yield server.start();
    app.use("/graphql", auth_middleware_js_1.default);
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express5_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            return {
                req,
                res,
            };
        }),
    }));
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
});
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
