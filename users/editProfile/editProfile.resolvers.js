require("dotenv").config();
import { client } from "../../client";
import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { protectedResolver, test } from "../users.utils";

const SECRET = process.env.SECRET_KEY;

const resolverFn = async (
  _,
  { firstname, lastname, username, email, password: newPassword },
  { loggedInUser }
) => {
  // variable for hashed password when newpassword is submitted
  let uglyPassword = undefined;

  // check if password is edited to hash
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }

  // update the user's profile with id received from vertifiedToken
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
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
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
