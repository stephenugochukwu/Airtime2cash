import Joi from 'joi';
import jwt from 'jsonwebtoken';

export const validationSchema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().max(9).required(),
        username: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        phonenumber: Joi.string().required(),
        isVerified: Joi.boolean().required(),
        avatar: Joi.string().required(),
        password: Joi.string().min(8).alphanum().required(),
        confirmpassword:Joi.ref('password')

}).with('password', 'confirmpassword')

export const resetPasswordSchema = Joi.object()
  .keys({
    password: Joi.string().required(),
    confirmpassword: Joi.any()
      .equal(Joi.ref('password'))

      .required()

      .label('Confirm password')

      .messages({ 'any.only': '{{#label}} does not match' }),
  })
  .with('password', 'confirmpassword');

export const generateToken = (user: Record<string, unknown>): unknown => {
  const passPhrase = process.env.JWT_SECRETE as string;
  return jwt.sign(user, passPhrase, { expiresIn: '7d' });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};
