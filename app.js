import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import session from "express-session";
import passport from "passport";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import authRouter from "./routes/auth.js";
import rootRouter from "./routes/root.js";
import foldersRouter from "./routes/folders.js";
import filesRouter from "./routes/files.js";
import "./config/passport.js";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

app.use("/", rootRouter);
app.use("/", authRouter);
app.use("/", foldersRouter);
app.use("/", filesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
