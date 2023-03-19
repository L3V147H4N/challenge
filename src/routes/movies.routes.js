import { Router } from "express";
import { MovieController } from "../controllers/index.js";

const router = Router();
const movieController = new MovieController();

router.get('/all', movieController.getAll);
router.get('/search', movieController.search);
router.get('/:id', movieController.getById);
router.post('/create', movieController.create);

export default router;