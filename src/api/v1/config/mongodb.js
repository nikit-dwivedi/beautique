import mongoose from "mongoose";
import {config} from "dotenv";
config()

const username = process.env.DBUSERNAME
const password = process.env.DBPASSWORD
const datebase = process.env.DBNAME
const db = mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.5zi8b.mongodb.net/${datebase}?retryWrites=true&w=majority`,
  (err) => {
    console.log("Database connected");
    if (err) {
      console.log(err);
    }
  }
);
export default { db };
