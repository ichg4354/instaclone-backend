require("dotenv").config();
import jwt from "jsonwebtoken";
import { client } from "../../client";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET_KEY;

export default {
  Mutation: {
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
      // if password correct -> return token
      return {
        ok: true,
        token: token,
      };
    },
  },
};
