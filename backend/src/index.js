import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./lib/server.js";
import { app, server } from "./utils/sodket.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 4001;

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/message", messageRoute);



if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  console.log("Serving static build from:", frontendPath);

  app.use(express.static(frontendPath));

  const routes = ["/", "/home", "/profile", "/Setting","/login","/home"];
  routes.forEach(route => {
    app.get(route, (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
}

server.listen(PORT, () => {
  console.log("Server started at port", PORT);
  dbConnect(process.env.DB_URL);
});
