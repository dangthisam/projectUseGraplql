   
   import { get } from "mongoose";
import Article from "./models/articles.model";
   import Category from "./models/category.model";  
import { create } from "domain";
   const resolvers = {
        Query: {
            articles: async () => {
                try {
                    // Lấy danh sách bài viết từ cơ sở dữ liệu
                    return await Article.find({ deleted: false }).sort({ createdAt: -1 });
                } catch (error) {
                    console.error('Error fetching articles:', error);
                    throw new Error('Failed to fetch articles');
                }
            },


            // Hàm này sẽ lấy một bài viết theo ID
            getArticle: async (__, args) => {
              const { id } = args;
                try {
                    return await Article.findById({
                        _id: id,
                        deleted: false
                    });
                } catch (error) {
                    console.error('Error fetching article:', error);
                    throw new Error('Failed to fetch article');
                }
            },

            categories: async () => {
                try {
                    // Lấy danh sách danh mục từ cơ sở dữ liệu
                    return await Category.find({ deleted: false }).sort({ createdAt: -1 });
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    throw new Error('Failed to fetch categories');
                }
            },

            getCategory: async (__, args) => {
                const { id } = args;
                try {
                    return await Category.findById({
                        _id: id,
                        deleted: false
                    });
                } catch (error) {
                    console.error('Error fetching category:', error);
                    throw new Error('Failed to fetch category');
                }
            }
        },
      Article:{
            category: async (article) => {
                try {
                    // Lấy danh mục của bài viết
                    return await Category.findById(article.category);
                } catch (error) {
                    console.error('Error fetching article category:', error);
                    throw new Error('Failed to fetch article category');
                }
            }
        },
        Mutation: {
            createArticle: async (__, args) => {
                try {
                    const { article } = args;
                    const newArticle = new Article(
                        ...article
                    );
                    return await newArticle.save();
                } catch (error) {
                    console.error('Error creating article:', error);
                    throw new Error('Failed to create article');
                }
            },

            deleteArticle: async (__, args) => {
                const { id } = args;
                try {
                    const article = await Article.findByIdAndUpdate(id, { deleted: true }, { new: true });
                    if (!article) throw new Error('Article not found');
                    return 'Article deleted successfully';
                } catch (error) {
                    console.error('Error deleting article:', error);
                    throw new Error('Failed to delete article');
                }
            },
            updateArticle: async (__, args) => {
                const { id, article } = args;
                try {
                   const updatedArticle = await Article.updateOne({
                        _id: id,
                        deleted: false
                    }, {
                        $set: {
                            title: article.title,
                            avatar: article.avatar,
                            description: article.description,
                            updatedAt: new Date().toISOString()
                        }
                    });

                    if (!updatedArticle) throw new Error('Article not found or update failed');
                    return await Article.findById(id); // Trả về bài viết đã cập nhật
                } catch (error) {
                    console.error('Error updating article:', error);
                    throw new Error('Failed to update article');
                }
            },

            createCategory: async (__, args) => {
                try {
                    const { category } = args;
                    const newCategory = new Category(
                        category
                    );
                    return await newCategory.save();
                } catch (error) {
                    console.error('Error creating category:', error);
                    throw new Error('Failed to create category');
                }
            },


            updateCategory: async (__, args) => {
                const { id, category } = args;
                try {
                    const updatedCategory = await Category.updateOne({
                        _id: id,
                        deleted: false
                    }, {
                        $set: {
                            title: category.title,
                            avatar: category.avatar,
                            updatedAt: new Date().toISOString()
                        }
                    });

                    if (!updatedCategory) throw new Error('Category not found or update failed');
                    return await Category.findById(id); // Trả về danh mục đã cập nhật
                } catch (error) {
                    console.error('Error updating category:', error);
                    throw new Error('Failed to update category');
                }
            },

            deleteCategory: async (__, args) => {
                const { id } = args;
                try {
                    const category = await Category.findByIdAndUpdate(id, { deleted: true }, { new: true });
                    if (!category) throw new Error('Category not found');
                    return 'Category deleted successfully';
                } catch (error) {
                    console.error('Error deleting category:', error);
                    throw new Error('Failed to delete category');
                }
            }
        }
    };

    export default resolvers;