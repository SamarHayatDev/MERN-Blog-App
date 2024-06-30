import mongoos from "mongoose";

export const ConnectDB = async () => {
  await mongoos.connect(
    "mongodb+srv://samarhayatdev:9050Ee22@cluster0.qigkrrd.mongodb.net/blog-app"
  );
  console.log("DB Connected");
};
