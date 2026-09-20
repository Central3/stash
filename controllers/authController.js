import bcrypt from "bcryptjs";
import { matchedData, validationResult } from "express-validator";

import { prisma } from "../lib/prisma.js";

export function renderSignup(req, res) {
  res.render("sign-up");
}

export async function signUp(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const { password, confirm_password, ...formData } = req.body;
    return res
      .status(400)
      .render("sign-up", { prevData: formData, errors: result.mapped() });
  }

  const { name, username, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
    },
  });

  res.redirect("/log-in");
}

export function renderLogin(req, res) {
  res.render("login");
}
