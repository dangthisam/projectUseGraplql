"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefsArticle = (0, graphql_tag_1.gql) `
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    createdAt: String
    updatedAt: String
    category: Category
  }

  type Query {
    articles(sortKey: String,
     sortValue: String,
     currentPage: Int,
     limit: Int,
     filterKey: String,
     filterValue: String,
     keyWord: String
     ): [Article]
    getArticle(id: ID): Article
  }
  # định nghĩa input type cho việc tạo bài viết mới
  # để client có thể gửi dữ liệu bài viết mới khi gọi mutation createArticle

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;
exports.default = typeDefsArticle;
