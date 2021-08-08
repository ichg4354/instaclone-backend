import { client } from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstname, lastname, username, email, password }
    ) => {
      try {
        // check if username or firstname is taken
        const searchedUser = await client.user.findFirst({
          where: {
            OR: [{ username: username }, { firstname: firstname }],
          },
        });

        // throw error when username or firstname is taken
        if (searchedUser) {
          throw new Error("username or firstname is already taken");
        }

        // add hash and salt to password
        const uglyPassword = await bcrypt.hash(password, 10);

        // create and return user
        return client.user.create({
          data: {
            firstname,
            lastname,
            username,
            email,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
