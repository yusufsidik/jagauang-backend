import Joi from 'joi'

export const transactionValidation = Joi.object({
    date: Joi.date().required(),
    category: Joi.string().length(24).hex().required(),
    sub_total: Joi.number().required(),
    information: Joi.string().max(255)
})

