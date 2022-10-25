import { Request, Response } from 'express';
import { UserInstance } from '../models/userModel';
import { options, resetPasswordSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import { forgotPasswordVerification } from '../email/emailVerification';
import Mailer from '../email/sendMail';

const fromUser = process.env.FROM as string;
const subject = process.env.SUBJECT as string;

export async function forgotPassword(req: Request, res: Response): Promise<unknown> {
  try {
    const { email } = req.body;
    const user = (await UserInstance.findOne({
      where: {
        email: email,
      },
    })) as unknown as { [key: string]: string };

    if (!user) {
      return res.status(404).json({
        message: 'email not found',
      });
    }
    const { id } = user;
    const html = forgotPasswordVerification(id);
    await Mailer.sendEmail(fromUser, req.body.email, subject, html);

    res.status(200).json({
      message: 'Kindly check your email for verification',
    });
  } catch (error) {
    res.status(500);
    throw new Error(`${error}`);
  }
}

export async function resetPassword(req: Request, res: Response): Promise<unknown> {
  try {
    const { id } = req.params;

    const validationResult = resetPasswordSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }

    const user = await UserInstance.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(403).json({
        message: 'user does not exist',
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);

    await user?.update({
      password: passwordHash,
    });
    return res.status(200).json({
      message: 'Password Successfully Changed',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
    throw new Error(`${error}`);
  }
}
