import { Router } from "express";
import { TvShowController } from "../controllers/index.js";

const router = Router();
const tvShowController = new TvShowController()

router.get('/all', tvShowController.getAll)
router.get('/:id', tvShowController.getById)
router.post('/create', tvShowController.create)

export default router;