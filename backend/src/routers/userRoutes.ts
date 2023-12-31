import { loginUser, signupUser } from "../controllers/authController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/api/signup", signupUser);
authRoutes.post("/api/login", loginUser);

export default authRoutes;
