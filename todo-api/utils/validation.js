import { body, validationResult } from 'express-validator';
import apiResponse from './apiResponse.js';

const validate = (req, res, next) => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (errors.length > 0) {
    return apiResponse({
      statusCode: 403,
      error: errors,
      message: 'Validation failed',
      data: [],
    })(res);
  }
  next();
};

export const createTodoValidation = [
  body('task')
    .notEmpty()
    .trim()
    .withMessage('task is required'),

  validate,
];


// export { createTodoValidation };
