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

export const deleteFolder = async (req, res) => {
  const { keep_files } = req.body;

  if (!keep_files) {
    const deleteFiles = await prisma.file.deleteMany({
      where: {
        folderId: req.folder.id,
      },
    });
  }

  const deleteFolder = await prisma.folder.delete({
    where: {
      id: req.folder.id,
    },
  });
  res.redirect("/");
};
