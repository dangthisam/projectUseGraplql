import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_HOST as string);
    console.log("connect success");
  } catch (error) {
    console.log(error);
    console.log("connect fail");
  }
};
export default connect;