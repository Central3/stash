import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

export const validateSignup = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .bail()
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: value,
            mode: "insensitive",
          },
        },
      });

      if (user) {
        throw new Error("username already in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must at least be 6 characters long"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords Don't match"),
];

export const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
