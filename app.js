import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import session from "express-session";
import passport from "passport";

import authRouter from "./routes/auth.js";
import "./config/passport.js";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
