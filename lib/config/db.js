// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//   await mongoose.connect(
//     "mongodb+srv://samarhayatdev:9050Ee22@cluster0.qigkrrd.mongodb.net/blog-app"
//   );
//   console.log("DB Connected");
// };

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected");
};
