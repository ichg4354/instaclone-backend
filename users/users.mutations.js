import { client } from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;

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
    login: async (_, { username, password }) => {
      // check if username exists
      const user = await client.user.findUnique({ where: { username } });

      // if !username -> return error message inside loginresult
      if (!user) {
        return {
          ok: false,
          error: "username not found",
        };
      }

      // if username -> compare password with userPassword
      const passwordPass = await bcrypt.compare(password, user.password);

      // if password incorrect -> return error inside loginresult
      if (!passwordPass) {
        return {
          ok: false,
          error: "password incorrect",
        };
      }
      const token = jwt.sign({ id: user.id }, SECRET);
      console.log(token);
      return {
        ok: true,
        token: token,
      };
      // if password correct -> return token
    },
  },
};
