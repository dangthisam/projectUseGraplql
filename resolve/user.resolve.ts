import User from "../models/user.model";

import { generateRandomString } from ".././helper/generate";
import md5 from "md5";
const userResolvers = {
  Query: {
    getUser: async (__, args) => {
      const { id } = args;
      const user = await User.findOne({ _id: id, deleted: false });
    if(user) {
        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          token: user.token,
          message: "User found",
          code: 200,
        };
      }else{
        return {
          code: 404,
          message: "User not found",
          success: false,
        };
      }
    },
  },

  
  Mutation: {
    registerUser: async (__, args) => {
      const { user } = args;
      console.log("User registration data:", user);
      const existEmail = await User.findOne({
        email: user.email,
        deleted: false,
      });
      if (existEmail) {
        return {
          code: 400,
          success: false,
          message: "Email already exists",
        };
      }
      const token = generateRandomString(20);
      const newUser = new User({
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: token,
      });
      await newUser.save();
      return {
        code: 200,
        success: true,
        message: "User registered successfully",
        email: newUser.email,
        token: newUser.token,
        id: newUser._id,
        fullName: newUser.fullName,
      };
    },

    loginUser: async (__, args) => {
      const { user } = args;
      console.log("User login data:", user);
      const existingUser = await User.findOne({
        email: user.email,
        deleted: false,
      });
      if (!existingUser) {
        return {
          code: 404,
          success: false,
          message: "User not found",
        };
      }
      if (existingUser.password !== md5(user.password)) {
        return {
          code: 401,
          success: false,
          message: "Invalid password",
        };
      }
      return {
        code: 200,
        success: true,
        message: "User logged in successfully",
        email: existingUser.email,
        token: existingUser.token,
        id: existingUser._id,
        fullName: existingUser.fullName,
      };
    },
  },
};

export default userResolvers;
