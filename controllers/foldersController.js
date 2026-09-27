import { prisma } from "../lib/prisma.js";

export const renderCreateFolder = (req, res) => {
  res.render("create-folder");
};

export const createFolder = async (req, res) => {
  await prisma.folder.create({
    data: {
      name: req.body.title,
      userId: req.user.id,
    },
  });
  res.redirect("/");
};

export const renderFolder = async (req, res) => {
  const folder = req.folder;

  const files = await prisma.file.findMany({
    where: { folderId: folder.id, userId: req.user.id },
  });
  res.render("folder", { folder, files });
};
