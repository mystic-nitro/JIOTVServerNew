import express from "express";
import cors from "cors";
import os from "node:os";
import 'dotenv/config';
import chalk from "chalk";
const app = express();
app.use(express.urlencoded({ extended: true }));
import fs from "fs";
app.use(express.json());
const PORT = process.env.PORT || 3500;
const address = process.env.ADDRESS;
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

if (!fs.existsSync("channel.db")) {
  fs["writeFileSync"]("./channel.db", '{"channel": {}}');
}

if (!fs.existsSync("channel-catchup.db")) {
  fs["writeFileSync"]("./channel-catchup.db", '{"channel": {}}');
}

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use(cors());

import loginRoute from "./routes/login.mjs";
import ipRoute from "./routes/ip.mjs";
import channelsRoute from "./routes/channel.mjs";
import playlistRoute from "./routes/playlist.mjs";
import catchulRoute from "./routes/catchup/index.mjs";

app.use("/", loginRoute);
app.use("/", ipRoute);
app.use("/", channelsRoute);
app.use("/", playlistRoute);
app.use("/catchup", catchulRoute);

// app.use(express.static(path.join(__dirname, "public")));
app.get("/favicon.ico", (req, res) => {
  return res.sendFile(path.join(__dirname + "/public/favicon.ico"));
});
import { handler } from "./build/handler.js";

app.use(handler);

app.listen(PORT, "jiotvserver-production-ab00.up.railway.app", () => {
  console.log(
    chalk.green("THIS SERVER IS 100% FREE. PLEASE DON'T PAY ANYONE.")
  );
});
