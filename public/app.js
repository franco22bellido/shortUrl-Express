document.addEventListener('click', e=>{
    
    if(e.target.dataset.short){
        
        const url = `${location.host}/${e.target.dataset.short}`;
        navigator.clipboard.writeText(url).then(()=>{
            console.log("copiad en el portapapeles")
        }).catch((err)=>{
            console.log(err);
        })
    };
});