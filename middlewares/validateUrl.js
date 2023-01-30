import {URL} from 'url';
const validate = (req, res, next)=>{
    try {
        const {origin} = req.body;
        
        const urlFrontEnd = new URL(origin);
        next();
    } catch (error) {
        res.json(error);
    }

}
export default validate;