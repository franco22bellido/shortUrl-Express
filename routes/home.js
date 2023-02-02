import { Router } from "express";
const router = Router();
import {create, deleteOne, renderUrls, updateOne, updateOnePost, redirect} from '../controllers/homeControllers.js';
import validate from "../middlewares/validateUrl.js";
import {isAuthenticated} from '../middlewares/validateSession.js';
 
router.get('/',[isAuthenticated], renderUrls);
router.post('/create',[validate], create);
router.get('/delete/:_id', deleteOne);
router.get('/update/:_id', updateOne);
router.post('/update/:_id', updateOnePost);
router.get('/:shortURL', redirect);

export default router;
