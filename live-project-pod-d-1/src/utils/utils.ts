import Joi from 'joi';
import jwt from 'jsonwebtoken';
export const registerUserSchema = Joi.object()
  .keys({
    name: Joi.string().trim().lowercase().required(),
    userName: Joi.string().trim().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string().trim().min(11).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref('password'),
  })
  .with('password', 'confirm_password');

export const loginSchema = Joi.object().keys({
  userName: Joi.string().trim().lowercase(),
  email: Joi.string().trim().lowercase(),
  password: Joi.string().required()
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: '7d' });
};
