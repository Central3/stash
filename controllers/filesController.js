import { prisma } from "../lib/prisma.js";

export const createFile = async (req, res) => {
  const folderId = req.folder?.id ?? null;

  console.log(req.params);

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      userId: req.user.id,
      folderId,
    },
  });
  res.redirect("/");
};
