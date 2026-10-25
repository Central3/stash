import { prisma } from "../lib/prisma.js";
import { supabase } from "../config/supabase.js";

export const createFolder = async (req, res) => {
  const folderId = req.folder?.id ?? null;

  await prisma.folder.create({
    data: {
      name: req.body.title,
      userId: req.user.id,
      parentId: folderId,
    },
  });

  const backURL = req.get("Referrer") || "/";
  res.redirect(backURL);
};

export const renderFolder = async (req, res) => {
  const folder = req.folder;

  res.render("folder", { folder, user: req.user });
};

export const deleteFolder = async (req, res) => {
  const { keep_files } = req.body;

  if (!keep_files) {
    const filePaths = await prisma.file.findMany({
      where: {
        folderId: req.folder.id,
      },
      select: {
        storagePath: true,
      },
    });
    const filesToDelete = filePaths.map((path) => path.storagePath);

    if (filesToDelete.length) {
      const { data, error } = await supabase.storage
        .from("stash_storage")
        .remove(filesToDelete);

      if (error) {
        console.error("Error deleting files: ", error);
        return;
      }
    }

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

  if (deleteFolder.parentId) {
    return res.redirect(`/folders/${deleteFolder.parentId}`);
  }

  res.redirect("/");
};
