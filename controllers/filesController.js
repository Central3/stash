import crypto from "node:crypto";

import { prisma } from "../lib/prisma.js";
import { supabase } from "../config/supabase.js";

export const createFile = async (req, res) => {
  const folderId = req.folder?.id ?? null;
  const uniqueFileName = `${crypto.randomUUID()}-${req.file.originalname}`;
  const storagePath = `files/${uniqueFileName}`;

  const { data, error } = await supabase.storage
    .from("stash_storage")
    .upload(storagePath, req.file.buffer, {
      upsert: false,
      contentType: req.file.mimetype,
    });

  if (error) {
    console.error("Error uploading file: ", error);
    return;
  }

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      userId: req.user.id,
      storagePath,
      folderId,
    },
  });

  const backURL = req.get("Referrer") || "/";
  res.redirect(backURL);
};

export const renderFile = async (req, res) => {
  const file = req.file;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(file.createAt);

  res.render("file", { file: { ...file, formattedDate }, user: req.user });
};

export const downloadFile = async (req, res, next) => {
  const file = req.file;

  const { data, error } = await supabase.storage
    .from("stash_storage")
    .createSignedUrl(file.storagePath, 60, { download: file.name });

  res.redirect(data.signedUrl);
};

export const deleteFile = async (req, res) => {
  const file = req.file;

  const { data, error } = await supabase.storage
    .from("stash_storage")
    .remove([file.storagePath]);

  if (error) {
    console.error("Error deleting file: ", error);
    return;
  }

  await prisma.file.delete({
    where: {
      id: file.id,
    },
  });

  if (file.folderId) {
    return res.redirect(`/folders/${file.folderId}`);
  }

  res.redirect("/");
};
