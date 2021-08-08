import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstname: String!
    lastname: String
    username: String!
    email: String!
  }
`;
