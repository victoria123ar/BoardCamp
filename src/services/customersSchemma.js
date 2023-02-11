import joi from "joi";


export const customersSchemma = joi.object({
    name: joi.string().required().min(2),
    phone: joi.alternatives().try(joi.number().min(10), joi.number().max(11))/* joi.number().required().min(10) */,
    cpf: joi.number().required().min(11),
    birthday: joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
  });