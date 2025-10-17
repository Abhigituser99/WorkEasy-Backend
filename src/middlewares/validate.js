// This function takes a Joi schema and returns a middleware function
const validate = (schema) => (req, res, next) => {
  // Validate the request body against the provided schema
  const { error } = schema.validate(req.body);

  if (error) {
    // If validation fails, extract the error message and send a 400 response
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ ok: false, message: errorMessage });
  }

  // If validation is successful, call the next middleware/route handler
  return next();
};

export default validate;