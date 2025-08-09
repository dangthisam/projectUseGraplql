import {gql} from "graphql-tag"


const typeDefsUser = gql`
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
    getUser(id: ID): User
  }

    
  type Mutation{
    registerUser(user: UserInput): User,
    loginUser(user: UserLoginInput): User,
  }
`;
export default typeDefsUser;