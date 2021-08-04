import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

const typeDefs = gql`
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

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
  Mutation: {
    addMovie: async (_, { title, year, genre }) => {
      await client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      });
    },
    deleteMovie: async (_, { id }) => {
      await client.movie.delete({
        where: {
          id,
        },
      });
      return true;
    },
    updateMovie: async (_, { id, title }) => {
      await client.movie.update({
        where: { id },
        data: { title },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("server running at http://localhost:4000/"));
