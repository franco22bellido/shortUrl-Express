import User from '../models/User.js';
import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator'; 

// 1:30
// agregar flash a confirmacionde acount
export const loginForm = (req, res)=>{
    res.render('login');
}

export const login = async(req, res)=>{
    //express validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('msg', errors.array());
        return res.redirect('/auth/login');
    };

    const {username, password} = req.body;
    try {
        //mongoose
        let user = await User.findOne({username});

        if(!user) throw "usuario o contraseña no valido";
        if(!user.acountConfirmed) throw "cuenta no confirmada";
        if(!await user.comparePassword(password)) throw "usuario o contraseña no valido";

        // req.login() es un metodo de passport
        req.login(user, (err)=>{
            if(err) throw "no se pudó generar la sesión";
            res.redirect('/');
        });
       
    } catch (error) {
        console.log(error);
        req.flash('msg', [{msg: error}]);
        res.redirect('/auth/login');
    }
}

export const registerForm = (req, res)=>{
    res.render('register');
}

export const registerUser = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('msg', errors.array());
        return res.redirect('/auth/register');
    };

    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({email:email});
        if(user) throw "usuario ya registrado";

        user = new User({username, email, password, tokenConfirm: nanoid()});
        await user.save();
        //enviar correo electronico con un token
        res.redirect("/auth/login");
    } catch (error) {
        req.flash("msg", [{msg: error}]);
        return res.redirect('/auth/register');
    }
}
export const confirmAcount = async(req, res)=>{
    const {token} = req.params;
    try {
        const user = await User.findOne({tokenConfirm: token});
        if(!user) throw "token not found";
        user.acountConfirmed= true;
        user.tokenConfirm = null;
        await user.save();
        req.flash('msg', [{msg: "se confirmó tu cuenta, puedes iniciar sesión"}]);
        res.redirect('/auth/login');
    } catch (error) {
        res.json(error);
    }
}

export const logOut = (req, res)=>{
    try {
        req.logOut((err)=>{
            if(err) throw "falló al cerrar sesión."
        });
        return res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
    }
}