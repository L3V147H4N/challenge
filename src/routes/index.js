import { Router } from "express";
import ActorsRoutes from "./actors.routes.js";
import DirectorsRoutes from "./directors.routes.js";
import MoviesRoutes from "./movies.routes.js";
import TvShowsRoutes from "./tvShows.routes.js";

const router = Router();

router.use('/actors', ActorsRoutes);
router.use('/directors', DirectorsRoutes);
router.use('/movies', MoviesRoutes);
router.use('/tvshows', TvShowsRoutes);


export default router;