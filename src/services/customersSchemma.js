import joi from "joi";

export const customersSchemma = joi.object({
  name: joi.string().required().min(2),
  phone: joi
    .string()
    .regex(/^[0-9]+$/)
    .min(10)
    .max(11)
    .required(),
  cpf: joi
    .string()
    .regex(/[0-9]{11}/)
    .required(),
  birthday: joi
    .date()
    .iso()
    .messages({ "date.format": `Date format is YYYY-MM-DD` })
    .required(),
});
