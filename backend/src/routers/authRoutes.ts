import { loginUser, signupUser } from "../controllers/authController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", signupUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
