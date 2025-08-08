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
  type Mutation{
    registerUser(user: UserInput): User,
  }
`;
export default typeDefsUser;