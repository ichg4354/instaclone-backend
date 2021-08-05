import { client } from "../client";

export default {
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
