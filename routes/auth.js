import express from "express";

import {
  renderSignup,
  renderLogin,
  signUp,
} from "../controllers/authController.js";
import { validateSignup } from "../validations/userValidation.js";

const router = express.Router();

router.get("/log-in", renderLogin);

router.get("/sign-up", renderSignup);
router.post("/sign-up", validateSignup, signUp);

export default router;
