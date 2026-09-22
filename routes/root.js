import path from "node:path";

import express from "express";
import multer from "multer";

const router = express.Router();

const uploadPath = path.join(import.meta.dirname, "..", "uploads");
const upload = multer({
  dest: uploadPath,
});

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.redirect("/");
});

export default router;
