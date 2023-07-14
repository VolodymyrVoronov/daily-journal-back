import express from "express";

import isAuthenticated from "../middlewares/is-authenticated";

import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import journals from "./journals/journals.routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/journals", isAuthenticated, journals);

export default router;
