import { connection } from "../db/db.js";

export async function listRentals(req, res) {
  const { customerId, gameId } = req.query;

  const queryGlobal = `
            SELECT rentals.*,
            json_build_object('id', customers.id, 'name', customers.name) AS customer,
            json_build_object('id', games.id, 'name', games.name) AS game
            FROM rentals
                JOIN customers ON customers.id = rentals."customerId"
                JOIN games ON games.id = rentals."gameId";`;

  try {
    const { rows } = customerId
      ? await connection.query(queryGlobal + 'WHERE "customerId"=$1;', [
          Number(customerId),
        ])
      : gameId
      ? await connection.query(queryGlobal + 'WHERE "gameId"=$1;', [
          Number(gameId),
        ])
      : await connection.query(queryGlobal);

    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertRent(req, res) {
  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
  } = res.locals.rental;
  try {
    await connection.query(
      `INSERT 
       INTO 
       rentals (
            "customerId",
            "gameId",
            "rentDate",
            "daysRented",
            "returnDate",
            "originalPrice",
            "delayFee")
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.status(201).send("Aluguel criado");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function finalizeRent(req, res) {
  const { id } = req.params;

  try {
    const result = await connection.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );

    const rental = result.rows[0];
    if (result.rowCount === 0) return res.sendStatus(404);
    if (rental.returnDate) return res.sendStatus(400);

    const diffInTime =
      new Date().getTime() - new Date(rental.rentDate).getTime();
    const diffInDays = Math.floor(diffInTime / (24 * 3600 * 1000));

    let delayFee = 0;
    if (diffInDays > rental.daysRented) {
      const addicionalDays = diffInDays - rental.daysRented;
      delayFee = addicionalDays * rental.originalPrice;
    }

    await connection.query(
      `UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id=$2;`,
      [delayFee, id]
    );

    res.status(200).send("Aluguel finalizado, jogo devolvido");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRent(req, res) {
  const { id } = req.params;

  try {
    const result = await connection.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );

    const rental = result.rows[0];

    if (result.rowCount === 0) return res.sendStatus(404);
    if (!rental.returnDate) return res.sendStatus(400);

    await connection.query("DELETE FROM rentals WHERE id=$1;", [id]);
    res.status(200).send("Aluguel deletado");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
