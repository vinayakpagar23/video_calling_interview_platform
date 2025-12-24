import express from "express";
import { ENV } from "./lib/env.js";

const app = express();
const PORT = ENV.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is running" });
});

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
