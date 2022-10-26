const api=require('express').Router();
const fs=require('fs');

api.get('/notes', (req,res)=>{
    console.info(`${req.method} request received`);

    fs.readFile('./db/db.json', 'utf8', (err, data)=>{
        if(err){
            console.error(err);
        }else{
            const notes=JSON.parse(data);
            res.json(notes);
        }
    });   
});

module.exports=api;