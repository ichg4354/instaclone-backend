import { client } from "../client";

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
      console.log(searchedUser);
      // check if firstname and username is taken
      // hash password
      // return selected profile
    },
  },
};
