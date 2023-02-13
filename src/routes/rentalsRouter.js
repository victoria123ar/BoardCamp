import { Router } from "express";
import {
  listRentals,
  insertRent,
  finalizeRent,
  deleteRent,
} from "../controllers/rentalsControllers.js";
import {
  validateRentals,
  gamesStock,
} from "../middlewares/rentalsMiddlewares.js";

const router = Router();

router.get("/rentals", listRentals);
router.post("/rentals", validateRentals, gamesStock, insertRent);
router.post("/rentals/:id/return", finalizeRent);
router.delete("/rentals/:id", deleteRent);

export default router;
