import { Router } from "express";
import { listCustomers, fetchCustomer, insertCustomer, updateCustomer } from "../controllers/customersControllers.js"
import { validateCustumers } from "../middlewares/customersMiddlewares.js"

const router = Router();

router.get("/customers", listCustomers);
router.get("/custumers/:id", fetchCustomer);
router.post("/customers", validateCustumers, insertCustomer);
router.put("/customers/:id", validateCustumers, updateCustomer);

export default router;