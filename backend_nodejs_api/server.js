const express = require("express");
const mysql= require("mysql2");

const app=express();
const PORT=8000;

app.use(express.json())

const db=mysql.createConnection({
    host: 'localhost',
    user:'root',
    database:'node_apis',
    password:'root'
})

app.get("/api/posts",(req,res)=>{
    db.query("SELECT * FROM post",(err,rows)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(rows);
    });
})

app.get("/api/posts/:id",(req,res)=>{
    db.query("SELECT * FROM post where id= ?",[req.params.id],(err,rows)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(rows[0]);
    });
})

app.post("/api/posts",(req,res)=>{
    const {title,body} = req.body;
    db.query("INSERT INTO post (title,body) values (?,?)",[title,body],(err,result)=>{
       if(err) return res.status(500).json({error:err.message});
       res.status(201).json({id:result.insertId,title,body})
    });
})

app.put("/api/posts/:id",(req,res)=>{
    const {title,body} = req.body;
    db.query("UPDATE post SET title= ?,body = ? WHERE id= ?",[title,body,req.params.id],(err,result)=>{
       if(err) return res.status(500).json({error:err.message});
       res.status(201).json({id:req.params.id,title,body})
    });
})

app.delete("/api/posts/:id",(req,res)=>{
    db.query("DELETE from post where id= ?",[req.params.id],(err,rows)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json({"message":"post deleted"});
    });
})

app.listen(PORT,()=>{
    console.log(`server running at 8000`);
})