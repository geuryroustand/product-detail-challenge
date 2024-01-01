import {
  getUserById,
  loginUser,
  signupUser,
} from "../controllers/userController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", getUserById);

export default userRoutes;
