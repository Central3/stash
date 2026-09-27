import express from "express";

import {
  renderCreateFolder,
  createFolder,
  renderFolder,
} from "../controllers/foldersController.js";
import loadFolder from "../middleware/loadFolder.js";

const router = express.Router();

router.get("/folders/new", renderCreateFolder);
router.post("/folders", createFolder);
router.get("/folders/:folderId", loadFolder, renderFolder);

export default router;
