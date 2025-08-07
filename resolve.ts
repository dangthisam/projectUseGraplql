   
   import Article from "./models/articles.model";
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
            }
        }
    };

    export default resolvers;