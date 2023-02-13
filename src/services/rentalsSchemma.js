import joi from "joi";

export const rentalsSchemma = joi.object({
  customerId: joi.number().positive().required(),
  gameId: joi.number().positive().required(),
  rentDate: joi.date().required(),
  daysRented: joi.number().positive().required(),
  returnDate: joi.date().allow(null),
  originalPrice: joi.number().required(),
  delayFee: joi.number().allow(null),
});