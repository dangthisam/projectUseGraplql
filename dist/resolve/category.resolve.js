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
const category_model_1 = __importDefault(require("../models/category.model"));
const resolversCategory = {
    Query: {
        categories: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield category_model_1.default.find({ deleted: false }).sort({ createdAt: -1 });
            }
            catch (error) {
                console.error('Error fetching categories:', error);
                throw new Error('Failed to fetch categories');
            }
        }),
        getCategory: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            try {
                return yield category_model_1.default.findById({
                    _id: id,
                    deleted: false
                });
            }
            catch (error) {
                console.error('Error fetching category:', error);
                throw new Error('Failed to fetch category');
            }
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield category_model_1.default.findById(article.categoryId);
            }
            catch (error) {
                console.error('Error fetching article category:', error);
                throw new Error('Failed to fetch article category');
            }
        })
    },
    Mutation: {
        createCategory: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { category } = args;
                const newCategory = new category_model_1.default(category);
                return yield newCategory.save();
            }
            catch (error) {
                console.error('Error creating category:', error);
                throw new Error('Failed to create category');
            }
        }),
        updateCategory: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            try {
                const updatedCategory = yield category_model_1.default.updateOne({
                    _id: id,
                    deleted: false
                }, {
                    $set: {
                        title: category.title,
                        avatar: category.avatar,
                        updatedAt: new Date().toISOString()
                    }
                });
                if (!updatedCategory)
                    throw new Error('Category not found or update failed');
                return yield category_model_1.default.findById(id);
            }
            catch (error) {
                console.error('Error updating category:', error);
                throw new Error('Failed to update category');
            }
        }),
        deleteCategory: (__, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            try {
                const category = yield category_model_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
                if (!category)
                    throw new Error('Category not found');
                return 'Category deleted successfully';
            }
            catch (error) {
                console.error('Error deleting category:', error);
                throw new Error('Failed to delete category');
            }
        })
    }
};
exports.default = resolversCategory;
