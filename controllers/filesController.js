import { prisma } from "../lib/prisma.js";

export const createFile = async (req, res) => {
  const folderId = req.folder?.id ?? null;

  await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
      destination: req.file.destination,
      fileName: req.file.filename,
      userId: req.user.id,
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

  res.render("file", { file: { ...file, formattedDate } });
};

export const downloadFile = async (req, res, next) => {
  const file = req.file;

  res.download(file.path, file.name, function (err) {
    if (!err) return;

    res.statusCode = 404;
    res.send("Can't find that file, sorry!");
  });
};
