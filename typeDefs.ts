

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
      }

      type Query {
        articles: [Article],
        getArticle(id: ID): Article,
      }
# định nghĩa input type cho việc tạo bài viết mới
      # để client có thể gửi dữ liệu bài viết mới khi gọi mutation createArticle

      input ArticleInput {
        title: String,
        avatar: String,
        description: String

        }

        type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID): String}
       
    `;


    export default typeDefs;