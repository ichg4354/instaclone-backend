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
  type Mutation {
    createAccount(
      firstname: String!
      lastname: String
      username: String!
      email: String!
      password: String!
    ): User
  }
`;
