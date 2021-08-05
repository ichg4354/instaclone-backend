import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    addMovie(title: String!, year: Int, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, title: String!): Movie
  }
  type Movie {
    id: Int!
    title: String!
    year: String
    createdAt: String!
    updatedAt: String!
    genre: String
  }
`;
