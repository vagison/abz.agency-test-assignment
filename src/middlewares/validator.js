import { checkSchema, validationResult } from 'express-validator';

function validate(schema) {
  return async (req, res, next) => {
    // check schema
    await checkSchema(schema).run(req);

    // get validation errors and add to the request object
    const fails = validationResult(req);
    req.fails = fails;

    // continue
    return next();
  };
}

export { validate };
