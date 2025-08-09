"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefsArticls_typeDef_1 = __importDefault(require("./typeDefsArticls.typeDef"));
const category_typedefs_1 = __importDefault(require("./category.typedefs"));
const user_typeDefs_1 = __importDefault(require("./user.typeDefs"));
const typeDefs = [
    typeDefsArticls_typeDef_1.default,
    category_typedefs_1.default,
    user_typeDefs_1.default
];
exports.default = typeDefs;
