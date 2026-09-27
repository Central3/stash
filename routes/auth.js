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
import { checkLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/log-in", checkLoggedIn, renderLogin);
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

router.get("/sign-up", checkLoggedIn, renderSignup);
router.post("/sign-up", validateSignup, signUp);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
});

export default router;
