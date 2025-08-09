"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefsCategory = (0, graphql_tag_1.gql) `
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
exports.default = typeDefsCategory;
