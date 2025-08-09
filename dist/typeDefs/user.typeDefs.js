"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefsUser = (0, graphql_tag_1.gql) `
  type User {
    id: ID
    fullName: String
    email: String
    password: String
    code: Int
    token: String,
    message: String,
  }

  input UserInput {
    fullName: String
    email: String
    password: String
  }

  input UserLoginInput {
    email: String
    password: String
  }


  type Query {
    getUser : User
  }

    
  type Mutation{
    registerUser(user: UserInput): User,
    loginUser(user: UserLoginInput): User,
  }
`;
exports.default = typeDefsUser;
