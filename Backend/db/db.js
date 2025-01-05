import mongoose from "mongoose";

function connect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log("Connection failed", err);
    });
}

export default connect;
