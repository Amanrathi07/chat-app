import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./lib/server.js";
import { app, server } from "./utils/sodket.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 4001;

app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  console.log("Serving static build...");
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    console.log("Catch-all route hit");
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server start at port", PORT);
  dbConnect(process.env.DB_URL);
});
