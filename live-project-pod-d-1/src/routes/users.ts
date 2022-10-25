import express from 'express';
import { validate } from 'uuid';
import { RegisterUser, userLoggin } from '../controller/userController'
import { forgotPassword, resetPassword } from '../controllers/userController';
const router = express.Router()

router.post('/create', RegisterUser)
router.post('/forgotpassword', forgotPassword);
router.patch('/reset-password/:id', resetPassword);
router.post('/login', userLoggin)
// router.patch('/reset-password/:token', resetPassword);
export default router;

