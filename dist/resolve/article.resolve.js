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
const articles_model_1 = __importDefault(require("../models/articles.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const resolversArticle = {
    Query: {
        articles: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sortKey, sortValue, currentPage, limit, filterKey, filterValue, keyWord } = args;
                const sort = {};
                if (sortKey && sortValue) {
                    sort[sortKey] = sortValue;
                }
                const skip = currentPage && limit ? (currentPage - 1) * limit : 0;
                const find = {
                    deleted: false
                };
                if (filterKey && filterValue) {
                    find[filterKey] = filterValue;
                }
                if (keyWord) {
                    const regex = new RegExp(keyWord, "i");
                    find["title"] = regex;
                }
                return yield articles_model_1.default.find(find).sort(sort).limit(limit).skip(skip);
            }
            catch (error) {
                console.error("Error fetching articles:", error);
                throw new Error("Failed to fetch articles");
            }
        }),
        getArticle: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            try {
                return yield articles_model_1.default.findById({
                    _id: id,
                    deleted: false,
                });
            }
            catch (error) {
                console.error("Error fetching article:", error);
                throw new Error("Failed to fetch article");
            }
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield category_model_1.default.findById(article.categoryId);
            }
            catch (error) {
                console.error("Error fetching article category:", error);
                throw new Error("Failed to fetch article category");
            }
        }),
    },
    Mutation: {
        createArticle: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { article } = args;
                const newArticle = new articles_model_1.default(article);
                return yield newArticle.save();
            }
            catch (error) {
                console.error("Error creating article:", error);
                throw new Error("Failed to create article");
            }
        }),
        deleteArticle: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            try {
                const article = yield articles_model_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
                if (!article)
                    throw new Error("Article not found");
                return "Article deleted successfully";
            }
            catch (error) {
                console.error("Error deleting article:", error);
                throw new Error("Failed to delete article");
            }
        }),
        updateArticle: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            try {
                const updatedArticle = yield articles_model_1.default.updateOne({
                    _id: id,
                    deleted: false,
                }, {
                    $set: {
                        title: article.title,
                        avatar: article.avatar,
                        description: article.description,
                        updatedAt: new Date().toISOString(),
                    },
                });
                if (!updatedArticle)
                    throw new Error("Article not found or update failed");
                return yield articles_model_1.default.findById(id);
            }
            catch (error) {
                console.error("Error updating article:", error);
                throw new Error("Failed to update article");
            }
        }),
    },
};
exports.default = resolversArticle;
