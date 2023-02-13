import joi from "joi";

export const gamesSchemma = joi.object({
  name: joi.string().required().min(2),
  image: joi.string().required().min(7),
  stockTotal: joi.number().required().min(0),
  pricePerDay: joi.number().required(),
});
