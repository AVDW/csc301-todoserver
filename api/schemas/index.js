const Joi = require('joi');

const todoSchema = Joi.object({
    task: Joi.string().required(),
    completed: Joi.boolean().required(),
    active: Joi.boolean().required(),
    modified_at: Joi.date().required()
});


module.exports = {todoSchema};