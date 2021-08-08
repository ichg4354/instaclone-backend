require("dotenv").config();
import { client } from "../../client";
import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET_KEY;

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstname, lastname, username, email, password: newPassword, token }
    ) => {
      // variable for hashed password when newpassword is submitted
      let uglyPassword = undefined;

      // vertify the token that is created when user logs in
      const { id } = jwt.verify(token, SECRET);

      // check if password is edited to hash
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      // update the user's profile with id received from vertifiedToken
      const updatedUser = await client.user.update({
        where: { id },
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
