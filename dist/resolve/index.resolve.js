"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_resolve_1 = __importDefault(require("./article.resolve"));
const category_resolve_1 = __importDefault(require("./category.resolve"));
const user_resolve_1 = __importDefault(require("./user.resolve"));
const resolvers = [
    article_resolve_1.default,
    category_resolve_1.default,
    user_resolve_1.default
];
exports.default = resolvers;
