import { Router } from "express";
import {validateLogin, validateRegister} from '../middlewares/validatorBody.js';
import { isNotAuthenticated } from "../middlewares/validateSession.js";
import {loginForm, registerForm, registerUser, confirmAcount, login, logOut} from '../controllers/authController.js';
import session from 'express-session';
import flash from 'connect-flash';

const router = Router();

router.get('/login',[isNotAuthenticated], loginForm);
router.post('/login',[isNotAuthenticated,validateLogin],login);
router.get('/register',[isNotAuthenticated], registerForm);
router.post('/register',[isNotAuthenticated, validateRegister], registerUser);
router.get('/confirmAcount/:token',[isNotAuthenticated], confirmAcount);
router.get('/logout', logOut);


export default router;