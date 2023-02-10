import { connection } from "../db/db.js"

export async function listCustomers(req, res){
    try {
        const customers = await connection.query(
                  "SELECT * FROM customers;",
          );
    
          return res.status(200).send(customers.rows);
        }
      catch (error) {
        res.status(500).send(error.message);
      }
}

export async function fetchCustomer(req, res){
    const { id } = req.params;
  try {
    const { rows } = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertCustomer(req, res){
        const { name, phone, cpf, birthday } = res.locals.customer;

    try {
      await connection.query(
        "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
        [name, phone, cpf, birthday]
      );
  
      res.status(201).send("Cliente criado");
    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function updateCustomer(req, res){
    const { name, phone, cpf, birthday } = res.locals.customer;
  const { id } = req.params;

  try {
    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE customers.id = $5",
      [name, phone, cpf, birthday, id]
    );

    res.status(200).send("Cliente atualizado");
  } catch (err) {
    res.status(500).send(err.message);
  }
}