import {URL} from 'url';
const validate = (req, res, next)=>{
    try {
        const {origin} = req.body;
        
        const urlFrontEnd = new URL(origin);
        
        if(urlFrontEnd.origin !== null){
            return next();
            // if(urlFrontEnd.protocol === "http://" || urlFrontEnd === "https://"){
            //     return next();
            // }else{
            //     throw new Error("tiene que tener http o https://");
            // }   
        }
    } catch (error) {
        if(error.message == "Invalid URL"){
            req.flash('msg', [{msg : "url no valida"}]);
     
        }else{
        req.flash('msg', [{msg : error.message}]);
        }
        return res.redirect('/');
    }

}
export default validate;