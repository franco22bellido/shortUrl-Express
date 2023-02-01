import User from '../models/User.js';
import { nanoid } from 'nanoid';

export const loginForm = (req, res)=>{
    console.log("logins");
    res.render('login');
}
export const login = async(req, res)=>{
    const {username, password} = req.body;
    try {
        let user = await User.findOne({username});

        if(!user) throw "usuario o contraseña no valido";
        if(!user.acountConfirmed) throw "cuenta no confirmada";
        if(!await user.comparePassword(password)) throw "usuario o contraseña no valido";
        res.redirect("/");
 
    } catch (error) {
        res.json(error);   
    }
}


export const registerForm = (req, res)=>{
    res.render('register');
}
export const registerUser = async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({email:email});
        if(user) throw "usuario ya registrado";

        user = new User({username, email, password, tokenConfirm: nanoid()});
        await user.save();
        //enviar correo electronico con un token
        res.redirect("/login");
    } catch (error) {
        res.json({
            info: "error al guardar usuario",
            error,
        });   
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
        res.redirect('/login');
    } catch (error) {
        res.json(error);
    }
}