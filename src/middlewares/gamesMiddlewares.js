import { connection } from "../db/db.js";
import { gamesSchemma } from "../services/gamesSchemma.js";

export async function validateGames(req, res, next) {
  const game = req.body;

  const { error } = gamesSchemma.validate(game, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const existsGame = await connection.query(
    "SELECT * FROM games WHERE name=$1",
    [game.name]
  );

  if (existsGame.rowCount !== 0) {
    return res.status(409).send("Jogo já existe");
  }

  res.locals.game = game;

  next();
}