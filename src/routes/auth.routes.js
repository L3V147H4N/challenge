import { Router } from "express";
import {AuthController } from "../controllers/index.js";

const router = Router();
const authController = new AuthController();

router.get('/token', authController.getToken);
router.post('/refresh-token', authController.getRefreshToken);

export default router;