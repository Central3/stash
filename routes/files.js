import path from "node:path";

import expess from "express";
import multer from "multer";

import loadFolder from "../middleware/loadFolder.js";
import {
  createFile,
  renderFile,
  downloadFile,
} from "../controllers/filesController.js";
import loadFile from "../middleware/loadFile.js";

const uploadPath = path.join(import.meta.dirname, "..", "uploads");
const upload = multer({
  dest: uploadPath,
});

const router = expess.Router();

router.post("/files", upload.single("file"), createFile);
router.post(
  "/folders/:folderId/files",
  loadFolder,
  upload.single("file"),
  createFile
);
router.get("/files/:fileId", loadFile, renderFile);
router.get("/files/:fileId/download", loadFile, downloadFile);

export default router;
