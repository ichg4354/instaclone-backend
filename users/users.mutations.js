import { client } from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstname, lastname, username, email, password }
    ) => {
      const searchedUser = await client.user.findFirst({
        where: {
          OR: [{ username: username }, { firstname: firstname }],
        },
      });
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
      // return selected profile
    },
  },
};
