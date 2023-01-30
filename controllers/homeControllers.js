import {Url} from '../models/Url.js';


export const renderUrls = async (req, res)=>{
    const urls = await Url.find().lean();
    
    res.render('home', {urls});
}
export const deleteOne= async (req, res)=>{
    try {
        const {_id} =  req.params;
        await Url.findByIdAndDelete(_id);
        res.redirect('/');
    } catch (error) {
        res.json(error);
    }
}
export const create= async (req, res)=>{
    try { 
        const {origin} = req.body;
        
        const url = new Url({origin: origin, shortURL: "url cortas"});
        await url.save();
    
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
    
}
export const updateOne= async (req, res)=>{

       try {
        const {_id}  = req.params;
        const url = await Url.findById(_id).lean()  ;
        console.log(url);
        res.render('home', {url});
       } catch (error) {
        res.json(error);
       }
}

export const updateOnePost= async (req, res)=>{
    try {
     const {_id}  = req.params;
     const {origin} = req.body;
     await Url.findByIdAndUpdate(_id, {origin});

     res.redirect('/');
    } catch (error) {
     res.json(error);
    }
}

export const redirect = async (req ,res)=>{
    try {
        const {shortURL}  = req.params;
        const document =await Url.findOne({shortURL}).lean();
        console.log(document.origin);
        res.redirect(document.origin);
    } catch (error) {
        res.json(error);
    }
};