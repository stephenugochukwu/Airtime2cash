import express, { Request, Response, NextFunction } from "express";
import { UUIDV4, ValidationError } from "sequelize";
import { v4 as uuidv4, validate } from "uuid";
import { UserInstance } from "../models/userModel";
import { validationSchema } from "../utils/validation"
import bcrypt from "bcrypt"
import generateToken from "../controllers/token.generate";
import { loginSchema } from "../utils/utils";
import sendEmail from './email/sendmail';

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction) {
    const id = uuidv4();
    try {
      const ValidateUser = validationSchema.validate(req.body);
      if (ValidateUser.error) {
        return res.status(400).json({
          Error: ValidateUser.error.details[0].message,
        });
      }
      const duplicateEmail = await UserInstance.findOne({
        where: { email: req.body.email },
      });

      if (duplicateEmail) {
        return res.status(409).json({
          msg: 'Email has been used, please enter another email',
        });
      }

      const duplicatePhone = await UserInstance.findOne({
        where: { phonenumber: req.body.phonenumber },
      });

      if (duplicatePhone) {
        return res.status(409).json({
          msg: 'phone number has been used'
        });
      }
      const passwordHash = await bcrypt.hash(req.body.password, 8);
      const record = await UserInstance.create({
        id: id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: passwordHash,
        confirmpassword: passwordHash,
        isVerified: req.body.isVerified,
        avatar: req.body.avatar
      })

      res.status(201).json({
        status: "success",
        msg: "successfully created a user",
        record
      })
      res.status(201).json({
        message: "user created successfully",
        record
      })

    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

    }

}

export async function userLoggin(req: Request, res: Response) {
  console.log('mark point');

  try {
    return res.status(200).json({
      msg: "This is the point"
    })
  } catch (err) {
      console.log(err);

    }

  try {
    const validate = loginSchema.validate(req.body)
    if (validate.error) {
      return res.status(401).json(validate.error.details[0].message)
    }

    let User;
    if (req.body.username) {
      User = await UserInstance.findOne({ where: { username: req.body.username } }) as unknown as { [key: string]: string };
    } else if (req.body.email) {
      User = await UserInstance.findOne({ where: { email: req.body.email } }) as unknown as { [key: string]: string };
    } else {
      return res.status(401).json({
        message: 'Sorry this user is not registered'
      })
    }

    const { id } = User
    const token = await generateToken({ id })

    const confirmUser = await bcrypt.compare(User.password, req.body.password)

    if (!confirmUser) {
      return res.status(401).json({message:"Sorry your password is wrong!"})
    }

    return res.status(200).json({
      message: 'You have successfully logged in',
      token
    })

  } catch (error) {
    res.status(500).json({
      message:" failed to login user"
    })

  }
}
