import { prisma } from "../lib/prisma.js";

export default async function loadFolder(req, res, next) {
  const { folderId } = req.params;
  const folder = await prisma.folder.findUnique({
    where: { id: Number(folderId), userId: req.user.id },
  });

  if (!folder) {
    return res.status(404).send("Folder not found");
  }

  req.folder = folder;
  next();
}
