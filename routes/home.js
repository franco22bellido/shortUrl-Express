import { Router } from "express";
const router = Router();
import {create, deleteOne, renderUrls, updateOne, updateOnePost, redirect} from '../controllers/homeControllers.js';
import validateUrl from "../middlewares/validateUrl.js";
import {isAuthenticated} from '../middlewares/validateSession.js';
import {formProfile, updateProflie} from '../controllers/profile.js';

router.get('/',[isAuthenticated], renderUrls);
router.post('/create',[isAuthenticated, validateUrl], create);
router.get('/delete/:_id',[isAuthenticated], deleteOne);
router.get('/update/:_id',[isAuthenticated], updateOne);
router.post('/update/:_id',[isAuthenticated], updateOnePost);
router.get('/:shortURL', redirect);

router.get('/profile/update',[isAuthenticated] ,formProfile);
router.post('/profile/update',[isAuthenticated] ,updateProflie);

export default router;
