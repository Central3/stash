import { prisma } from "../lib/prisma.js";

export const createFolder = async (req, res) => {
  const folderId = req.folder?.id ?? null;

  await prisma.folder.create({
    data: {
      name: req.body.title,
      userId: req.user.id,
      parentId: folderId,
    },
  });
  res.redirect("/");
};

export const renderFolder = async (req, res) => {
  const folder = req.folder;

  res.render("folder", { folder });
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
