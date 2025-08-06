   
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
            }
        },
    };

    export default resolvers;