import { Router } from "express";
const router = Router();

import {loginForm, registerForm, registerUser, confirmAcount, login} from '../controllers/authController.js';

router.get('/login', loginForm);
router.post('/login', login);
router.get('/register', registerForm);
router.post('/register', registerUser);
router.get('/confirmAcount/:token', confirmAcount);



export default router;