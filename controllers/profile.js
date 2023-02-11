import formidable from "formidable";
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import { fileURLToPath } from 'url';




export const formProfile = async(req, res)=>{

    const user = await User.findById(req.user.id).lean();
    
    res.render('perfil', {user});
}

export const updateProflie = async(req, res)=>{
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const form = new formidable.IncomingForm();
    //solo admito imagenes de menos de 50 mb
    form.maxFileSize = 50* 1024 * 1024;
    form.parse(req, async(err, fields, files)=>{
        try {
            if(err){
                throw new Error('fallo formidable');
            }
            const file = files.formFileSm;
            
    
            if(file.originalFilename === "") throw new Error('fallo formidable');

            const extension = file.mimetype.split('/')[1];
            const dirFile = path.join(__dirname, `../public/img/perfiles/${req.user.id}.${extension}`);

            //nueva ruta del archivo recibido
            fs.renameSync(file.filepath, dirFile);
            const user = await User.findById(req.user.id);
            user.image = `${req.user.id}.${extension}`
            await user.save();

            return res.redirect('/profile/update');
        } catch (error) {
            console.log(error);
        }
    });
}