import express from "express";
import passport from "passport";

import {
  renderSignup,
  renderLogin,
  signUp,
  login,
} from "../controllers/authController.js";
import {
  validateSignup,
  validateLogin,
} from "../validations/userValidation.js";

const router = express.Router();

router.get("/log-in", renderLogin);
router.post(
  "/log-in",
  validateLogin,
  login,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })
);

router.get("/sign-up", renderSignup);
router.post("/sign-up", validateSignup, signUp);

export default router;
