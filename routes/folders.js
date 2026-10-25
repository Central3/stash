import express from "express";

import {
  createFolder,
  renderFolder,
  deleteFolder,
} from "../controllers/foldersController.js";
import { createFile } from "../controllers/filesController.js";
import loadFolder from "../middleware/loadFolder.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", createFolder);
router.post("/:folderId", loadFolder, createFolder);
router.get("/:folderId", loadFolder, renderFolder);
router.post("/:folderId/delete", loadFolder, deleteFolder);
router.post("/:folderId/files", loadFolder, upload.single("file"), createFile);

export default router;
