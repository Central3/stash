import { prisma } from "../lib/prisma.js";

export const createFile = async (req, res) => {
  const folderId = req.folder?.id ?? null;

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      userId: req.user.id,
      folderId,
    },
  });

  const backURL = req.get("Referrer") || "/";
  res.redirect(backURL);
};
