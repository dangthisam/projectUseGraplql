   

import { constants } from "buffer";
import Article from "../models/articles.model";
import Category from "../models/category.model";
   const resolversArticle = {
        Query: {
            articles: async (__, args) => {
                try {
                   //sort
                    const { sortKey, sortValue } = args;
                 const   sort ={}
                    if (sortKey && sortValue) {
                        sort[sortKey] = sortValue 
                    }
                    // Lấy danh sách bài viết từ cơ sở dữ liệu
                    return await Article.find({ deleted: false }).sort(sort);
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

            
        },
      Article:{
            category: async (article) => {
                try {
                    // Lấy danh mục của bài viết
                    return await Category.findById(article.categoryId);
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
                        article
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

            
        }
    };

    export default resolversArticle;