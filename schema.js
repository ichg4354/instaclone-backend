import {
  mergeTypeDefs,
  mergeResolvers,
  loadFilesSync,
  makeExecutableSchema,
} from "graphql-tools";

const loadedTypeDef = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypeDef);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
