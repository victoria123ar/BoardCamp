import joi from "joi";

export const customersSchemma = joi.object({
    rentDate: joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
    daysRented: joi.string().required(),
    returnDate: joi.string().required(),
    originalPrice: joi.string().required(),
    delayFee: joi.string().required(),
  });