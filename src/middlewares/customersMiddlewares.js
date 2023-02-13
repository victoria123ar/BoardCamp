import { customersSchemma } from "../services/customersSchemma.js";
import { connection } from "../db/db.js";

export async function validateCustumers(req, res, next) {
  const customer = req.body;

  const { error } = customersSchemma.validate(customer, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const customerExists = await connection.query(
    "SELECT * FROM customers WHERE cpf=$1",
    [customer.cpf]
  );

  if (
    customerExists.rowCount !== 0 &&
    customerExists.rows[0].id !== Number(req.params.id)
  ) {
    return res.status(409).send("Cliente já existe");
  }

  res.locals.customer = customer;

  next();
}
