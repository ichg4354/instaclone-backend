import { client } from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstname, lastname, username, email, password: newPassword }
    ) => {
      let uglyPassword = undefined;

      // check if password is edited to hash
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: 2 },
        data: {
          firstname,
          lastname,
          username,
          email,
          password: uglyPassword,
        },
      });

      if (updatedUser.id) {
        return { ok: true };
      } else {
        return { ok: false, error: "Could not update Profile" };
      }
    },
  },
};
