import { Router } from "express";
import { listRentals, insertRent, finalizeRent, eraseRent } from "../controllers/gamesControllers.js"

const router = Router();

router.get("/rentals", listRentals);
router.post("/crentals", insertRent);
router.post("/rentals/:id/return", finalizeRent);
router.delete("/rentals/:id", eraseRent);

export default router;