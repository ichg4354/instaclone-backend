import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstname: String!
    lastname: String
    username: String!
    email: String!
  }
  type Query {
    seeProfile(username: String!): User
  }
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    createAccount(
      firstname: String!
      lastname: String
      username: String!
      email: String!
      password: String!
    ): User
    login(username: String!, password: String!): LoginResult
  }
`;
