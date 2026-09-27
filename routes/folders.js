import express from "express";

import {
  renderCreateFolder,
  createFolder,
  renderFolder,
  deleteFolder,
} from "../controllers/foldersController.js";
import loadFolder from "../middleware/loadFolder.js";

const router = express.Router();

router.get("/folders/new", renderCreateFolder);
router.post("/folders", createFolder);
router.get("/folders/:folderId", loadFolder, renderFolder);
router.post("/folders/:folderId/delete", loadFolder, deleteFolder);

export default router;
