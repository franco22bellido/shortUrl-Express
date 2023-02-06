export const isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/auth/login');
    }
}
export const isNotAuthenticated = (req, res, next)=>{
    if(!req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/');
    }
}