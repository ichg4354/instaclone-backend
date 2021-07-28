import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    addMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
  type Movie {
    title: String
    year: String
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: "this is title", year: "this is year" }),
  },
  Mutation: {
    addMovie: (_, args) => {
      console.log(args);
      return true;
    },
    deleteMovie: (_, args) => {
      console.log(args);
      return true;
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
