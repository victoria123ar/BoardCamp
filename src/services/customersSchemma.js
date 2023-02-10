import joi from "joi";


export const customersSchemma = joi.object({
    name: joi.string().required().min(2),
    phone: joi.string().min(10).max(11),
    cpf: joi.string().required().min(11).max(11),
    birthday: joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
  });