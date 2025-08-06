


    const typeDefs = `
      type Article {
        _id: String
        title: String
        avatar: String
        description: String
        createdAt: String
        updatedAt: String
      }

      type Query {
        articles: [Article]
      }
    `;
    export default typeDefs;