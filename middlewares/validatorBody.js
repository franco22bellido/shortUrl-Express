import {body} from 'express-validator';


export const validateRegister = [
    body("username", "ingrese un username valido").trim().notEmpty().escape(),
    body("email", "ingrese un email valido").trim().notEmpty().escape().isEmail().normalizeEmail(),
    body("password", "ingrese una contraseña de minimo 6 caracteres").trim().isLength({min: 6}).escape().custom((value, {req})=>{
        
        if(value != req.body.repassword){
            throw "las contraseñas no coinciden";
        }else{
            return value;
        }
    })
]
export const validateLogin = [
    body("username", "ingrese un username valido").trim().notEmpty().escape(),
    body("password", "ingrese una contraseña de minimo 6 caracteres").trim().isLength({min: 6}).escape()
]