import Joi from "joi";

const covidSchema = Joi.object({
    date_reported: Joi.date().required(),
    confirmed_cases: Joi.number().min(0).required(),
    deaths_reported: Joi.number().min(0).required(),
    recovered_cases: Joi.number().min(0).required(),
    active_cases: Joi.number().min(0).required(),
    new_cases: Joi.number().min(0).required(),
    new_deaths: Joi.number().min(0).required(),
    new_recovered: Joi.number().min(0).required(),
    deaths_per_100_cases: Joi.number().min(0).max(100).required(),
    recovered_per_100_cases: Joi.number().min(0).max(100).required(),
});

export const validateCovidData = (req, res, next) => {
    const { error } = covidSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
