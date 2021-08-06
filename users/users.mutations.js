import { client } from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstname, lastname, username, email, password }
    ) => {
      try {
        const searchedUser = await client.user.findFirst({
          where: {
            OR: [{ username: username }, { firstname: firstname }],
          },
        });
        if (searchedUser) {
          throw new Error("username or firstname is already taken");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
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
      // return selected profile
    },
  },
};
