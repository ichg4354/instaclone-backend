require("dotenv").config();
import { client } from "../client";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

export const getUser = async (token) => {
  // vertify token to get id
  const { id } = jwt.verify(token, SECRET);
  try {
    //   find user with token received from vertified token
    const user = await client.user.findUnique({
      where: { id: id },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const protectedResolver = (resolver) => {
  return (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in",
      };
    }
    return resolver(root, args, context, info);
  };
};
