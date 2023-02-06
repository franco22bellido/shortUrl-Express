import {Url} from '../models/Url.js';
import { nanoid } from 'nanoid';


export const renderUrls = async (req, res)=>{
    try {
        const urls = await Url.find({user: req.user.id}).lean();
        
       
        res.render('home', {urls});
        
    } catch (error) {
        req.flash('msg', [{msg : error.message}]);
        return res.redirect('/');
    }
}
export const deleteOne= async (req, res)=>{
    try {
        const {_id} =  req.params;
        // await Url.findByIdAndDelete(_id);
        const url = await Url.findByIdAndRemove({_id, user: req.user.id});
        if(!url) throw new Error("no se encontro la url");

        req.flash('msg', [{msg : "url eliminada"}]);
        res.redirect('/');
    } catch (error) {
        req.flash('msg', [{msg : error.message}]);
        return res.redirect('/');
    }
}
export const create= async (req, res)=>{
    try { 
        const {origin} = req.body;
        
        const url = new Url({origin: origin, shortURL: nanoid(4), user: req.user.id});
        await url.save();
        req.flash('msg', [{msg : "url agregada"}]);
        res.redirect('/');
    } catch (error) {
        req.flash('msg', [{msg : error.message}]);
        return res.redirect('/');
    }
    
}
export const updateOne= async (req, res)=>{

       try {
        const {_id}  = req.params;
        const url = await Url.findOne({_id, user: req.user.id}).lean();
        
        res.render('home', {url});
       } catch (error) {
        req.flash('msg', [{msg : error.message}]);
        return res.redirect('/');
       }
}

export const updateOnePost= async (req, res)=>{
    try {
     const {_id}  = req.params;
     const {origin} = req.body;
     const url = await Url.findOneAndUpdate({_id, user: req.user.id},{origin});

     req.flash("msg", [{msg : "se actualizó una url"}]);
     res.redirect('/');
    } catch (error) {
        req.flash('msg', [{msg : error.message}]);
        return res.redirect('/');
    }
}

export const redirect = async (req ,res)=>{
    try {
         
        const {shortURL}  = req.params;
        const document =await Url.findOne({shortURL}).lean();
        if(!document) throw "no se pudo redireccionar porque no se encontro una url";
        res.redirect(document.origin);
    } catch (error) {
        req.flash('msg', [{msg : error}]);
        return res.redirect('/');
    }
};