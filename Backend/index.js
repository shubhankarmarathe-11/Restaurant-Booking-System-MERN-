import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB}`);
    console.log("connected to DB");
  } catch (err) {
    console.log("Not connected - " + err);
  }
};

// Routes
import { SignupRoute } from "./Routes/Signup.js";
import { LoginRoute } from "./Routes/Login.js";
import { IsActive } from "./Routes/IsActiveRoute.js";
import { GoogleauthRoute } from "./Routes/GoogleAuth.js";
import { BookTable } from "./Routes/BookTable.js";
import { SendInfo } from "./Routes/SendDetails.js";
import { CartRoute } from "./Routes/AddtoCart.js";

dotenv.config();

ConnectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.5.28:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", SignupRoute);
app.use("/api", LoginRoute);
app.use("/api", IsActive);
app.use("/api", GoogleauthRoute);
app.use("/api", BookTable);
app.use("/api", SendInfo);
app.use("/api", CartRoute);

app.listen(PORT, () => {
  console.log(`working on localhost:${PORT}`);
});
