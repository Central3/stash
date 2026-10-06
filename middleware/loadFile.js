import { prisma } from "../lib/prisma.js";

export default async function loadFile(req, res, next) {
  const { fileId } = req.params;

  const file = await prisma.file.findUnique({
    where: {
      id: Number(fileId),
    },
  });

  if (!file) {
    res.status(404).send("File not found");
  }

  req.file = file;
  next();
}
