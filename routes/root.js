import express from "express";

import { prisma } from "../lib/prisma.js";
import { checkAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id, parentId: null },
  });
  const files = await prisma.file.findMany({
    where: { folderId: null, userId: req.user.id },
  });
  res.render("index", { username: req.user.username, folders, files });
});

export default router;
