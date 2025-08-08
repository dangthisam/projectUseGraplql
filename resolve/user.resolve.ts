import User from "../models/user.model";

import {generateRandomString} from  ".././helper/generate"
import md5 from "md5";
const userResolvers = {
  Mutation: {
    registerUser: async (__, args) => {
      const { user } = args;
      console.log("User registration data:", user);
      const existEmail = await User.findOne({ email: user.email, deleted: false });
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
  },
};

export default userResolvers;