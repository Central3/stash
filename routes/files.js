import expess from "express";

import {
  createFile,
  renderFile,
  downloadFile,
  deleteFile,
} from "../controllers/filesController.js";
import loadFile from "../middleware/loadFile.js";
import { upload } from "../middleware/upload.js";

const router = expess.Router();

router.post("/", upload.single("file"), createFile);
router.get("/:fileId", loadFile, renderFile);
router.get("/:fileId/download", loadFile, downloadFile);
router.post("/:fileId/delete", loadFile, deleteFile);

export default router;
