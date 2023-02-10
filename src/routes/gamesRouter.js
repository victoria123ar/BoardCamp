import { Router } from "express";
import { listGames, insertGame } from "../controllers/gamesControllers.js"
import { validateGames } from "../middlewares/gamesMiddlewares.js"

const router = Router();

router.get("/games", listGames);
router.post("/games", validateGames, insertGame);

export default router;