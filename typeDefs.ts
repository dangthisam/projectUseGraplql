

// định nghĩa typedefs cho GraphQL schema tức là các kiểu dữ liệu và truy vấn mà client có thể gửi đến server
import {gql} from "graphql-tag";
    const typeDefs = gql`
      type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        createdAt: String,
        updatedAt: String
      },
      type Category {
        id: ID,
        title: String,
        avatar: String,
     
      },

      type Query {
        articles: [Article],
        getArticle(id: ID): Article,
        categories: [Category],
        getCategory(id: ID): Category
      }
# định nghĩa input type cho việc tạo bài viết mới
      # để client có thể gửi dữ liệu bài viết mới khi gọi mutation createArticle

      input ArticleInput {
        title: String,
        avatar: String,
        description: String

        }

        input CategoryInput {
          title: String,
          avatar: String
        }

        type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: ArticleInput): Article,
       getListCategory: [Category],
        createCategory(category: CategoryInput): Category,
        deleteCategory(id: ID): String,
        updateCategory(id: ID, category: CategoryInput): Category}
    `;


    export default typeDefs;