import { connection } from "../db/db.js";

export async function listGames(req, res) {
  try {
    const games = await connection.query("SELECT * FROM games;");
    return res.status(200).send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game;
  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);',
      [name, image, stockTotal, pricePerDay]
    );

    res.status(201).send("Jogo criado");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
