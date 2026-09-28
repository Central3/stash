import express from "express";

import {
  createFolder,
  renderFolder,
  deleteFolder,
} from "../controllers/foldersController.js";
import loadFolder from "../middleware/loadFolder.js";

const router = express.Router();

router.post("/folders", createFolder);
router.post("/folders/:folderId", loadFolder, createFolder);
router.get("/folders/:folderId", loadFolder, renderFolder);
router.post("/folders/:folderId/delete", loadFolder, deleteFolder);

export default router;
