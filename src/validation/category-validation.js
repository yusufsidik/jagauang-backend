import Joi from 'joi'

const typeEnum = ["pengeluaran","pemasukan"]

export const categoryValidation = Joi.object({
    name: Joi.string().max(100).required(),
    type: Joi.string().valid(...typeEnum).required(),
})