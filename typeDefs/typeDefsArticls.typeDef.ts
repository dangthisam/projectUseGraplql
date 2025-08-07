

// định nghĩa typedefs cho GraphQL schema tức là các kiểu dữ liệu và truy vấn mà client có thể gửi đến server
import {gql} from "graphql-tag";
    const typeDefsArticle = gql`
      type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        createdAt: String,
        updatedAt: String,
        category: Category
      },
  

      type Query {
        articles(sortKey: String ,sortValue: String): [Article],
        getArticle(id: ID): Article,
    
      }
# định nghĩa input type cho việc tạo bài viết mới
      # để client có thể gửi dữ liệu bài viết mới khi gọi mutation createArticle

      input ArticleInput {
        title: String,
        avatar: String,
        description: String,
        categoryId: String

        }


        type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: ArticleInput): Article,
        }
    `;


    export default typeDefsArticle;