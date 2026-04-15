import express from "express";
import cors from "cors";

// import dotenv and load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());              
app.use(express.json());

await connectDB(process.env.MONGO_URL);

// api/songs (Read all songs)
app.get("/api/songs", async (req, res) => {
    const rows = await Song.find().sort({ createdAt: -1 });
    res.json(rows);
  });
  
// api/songs (Insert song)
app.post("/api/songs", async (req, res) => {
    try {
      const { title = "", artist = "", year } = req.body || {};
  
      const created = await Song.create({
        title: title.trim(),
        artist: artist.trim(),
        year
      });
  
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ message: err.message || "Create failed" });
    }
  });