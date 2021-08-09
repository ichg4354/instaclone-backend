require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // token reveived from req header
    const token = req.headers.token;

    // check token variable
    if (!token) {
      return null;
    }

    // get userData
    const loggedInUser = await getUser(token);
    // return userData
    return { loggedInUser };
  },
});

server
  .listen(PORT)
  .then(() => console.log(`server running at http://localhost:${PORT}`));
