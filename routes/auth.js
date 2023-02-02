import { Router } from "express";
import {validateLogin, validateRegister} from '../middlewares/validatorBody.js';
import {loginForm, registerForm, registerUser, confirmAcount, login, logOut} from '../controllers/authController.js';
import session from 'express-session';
import flash from 'connect-flash';

const router = Router();

router.get('/login', loginForm);
router.post('/login',[validateLogin],login);
router.get('/register', registerForm);
router.post('/register',[validateRegister], registerUser);
router.get('/confirmAcount/:token', confirmAcount);
router.get('/logout', logOut);


export default router;