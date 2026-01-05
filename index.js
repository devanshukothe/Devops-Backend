import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = "mongodb+srv://CRUD:CRUD@cluster0.rl9h05d.mongodb.net/?appName=Cluster0";

async function startServer() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("✅ Successfully connected to Database");

    app.get("/", (req, res) => {
      res.send("API is working ✅");
    });

    app.use("/api", route);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer();
