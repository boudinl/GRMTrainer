import mongoose from "mongoose";

const connectToDB = async () => {
  const connectUrl = process.env.MONGODB_URI;
  mongoose
    .connect(connectUrl)
    .then(() => console.log("DataBase connected successfully"))
    .catch((err) =>
      console.log(`Getting error from DB connection ${err.message}`)
    );
};

export default connectToDB;
