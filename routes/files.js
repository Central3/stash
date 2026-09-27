import path from "node:path";

import expess from "express";
import multer from "multer";

import loadFolder from "../middleware/loadFolder.js";

const uploadPath = path.join(import.meta.dirname, "..", "uploads");
const upload = multer({
  dest: uploadPath,
});

import { createFile } from "../controllers/filesController.js";

const router = expess.Router();

router.post("/files", upload.single("file"), createFile);
router.post(
  "/folders/:folderId/files",
  loadFolder,
  upload.single("file"),
  createFile
);

export default router;
