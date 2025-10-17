import Joi from 'joi';

// Schema for user signup
const signupSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base': 'Password must contain an uppercase letter, a lowercase letter, and a number.',
    }),
  name: Joi.string().trim().min(2).required(),
  country: Joi.string().trim().min(2).required(),
  role: Joi.string().valid('USER', 'CREATOR').default('USER'),
});

// Schema for user login (we can add this here too!)
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


// Export the schemas to be used in other files
export {
    signupSchema,
    loginSchema
};