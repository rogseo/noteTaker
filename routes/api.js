const api=require('express').Router();
const fs=require('fs');
const uuid = require('../helpers/uuid');

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

api.post('/notes', (req,res)=>{
    console.info(`${req.method} request received to save note`);
    
    const { title, text}=req.body;
    if(title&&text){
        const newNote={
            title,
            text,
            id: uuid(),
        };
        
        //Obtain existing notes from db
        fs.readFile('./db/db.json','utf-8',(err, data)=>{
            if(err){
                console.error(err);
            }else{
                const notes=JSON.parse(data);
                notes.push(newNote);

                fs.writeFile('./db/db.json',JSON.stringify(notes, null, 4),
                (err)=>err?console.error(err):console.info('Successfully updated notes!')

                );
            }
        });

        const response = {
            status : 'success',
            body : req.body,
        };
        console.log(response);
        res.status(201).json(response);
    }else{
        res.status(500).json('Error in posting review')
    }

    
});

api.delete('/notes/:id', (req,res)=>{
    
    if(req.params.id){
        console.info(`${req.method} request received`);
        const deleteId=req.params.id;

        //Obtain existing notes from db
        fs.readFile('./db/db.json','utf-8',(err, data)=>{
            if(err){
                console.error(err);
            }else{
                const notes=JSON.parse(data);
                for(let i=0; i<notes.length;i++){
                    if (notes[i].id === deleteId) {
                        console.log(notes[i]);
                        notes.splice(i,1);
                        console.log(notes);
                        break
                      
                    }
                }
               

                fs.writeFile('./db/db.json',JSON.stringify(notes, null, 4),
                (err)=>err?console.error(err):console.info('Successfully updated notes!'));        
            }
        });
        res.status(201).json(`Successfully deleted!`);
        
  
    }
    else{
        res.status(500).json('Error in posting review');
    }

    

    // fs.readFile('./db/db.json', 'utf8', (err, data)=>{
    //     if(err){
    //         console.error(err);
    //     }else{
    //         const notes=JSON.parse(data);
    //         res.json(notes);
    //     }
    // });   
});

module.exports=api;