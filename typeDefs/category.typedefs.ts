

// định nghĩa typedefs cho GraphQL schema tức là các kiểu dữ liệu và truy vấn mà client có thể gửi đến server
import {gql} from "graphql-tag";
    const typeDefsCategory = gql`
      type Category {
        id: ID,
        title: String,
        avatar: String,
     
      },

      type Query {
     
        categories: [Category],
        getCategory(id: ID): Category
      }
# định nghĩa input type cho việc tạo bài viết mới
      # để client có thể gửi dữ liệu bài viết mới khi gọi mutation createArticle


        input CategoryInput {
          title: String,
          avatar: String
        }

        type Mutation {

       getListCategory: [Category],
        createCategory(category: CategoryInput): Category,
        deleteCategory(id: ID): String,
        updateCategory(id: ID, category: CategoryInput): Category}
    `;


    export default typeDefsCategory;