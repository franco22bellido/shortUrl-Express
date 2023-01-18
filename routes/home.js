import { Router } from "express";
const router = Router();

router.get('/',(req, res)=>{
    const urls = [
        {origin: "www.google.com", shortURL: "fasfasd"},
        {origin: "www.amazon.com", shortURL: "fasfasd"},
        {origin: "www.mercadolibre.com", shortURL: "fasfasd"},
        {origin: "www.youtube.com", shortURL: "fasfasd"}
    ]
    res.render('home', {urls});
});


export default router;