const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

 const dburl="mongodb+srv://prajaktabudhawale11:wU0PkZZa0KvLQVOQ@cluster0.5twb28c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.post("/save",(req,res)=>{
  const url = dburl;
  const client=  new MongoClient(url);
  const db = client.db("sms19july24");
  const coll = db.collection("student");
  const record ={"_id":req.body.rno,"name" :req.body.name,"marks" :req.body.marks};

   coll.insertOne(record)
   .then(result => res.send(result))
   .catch(error => res.send(error));
   
});


app.get("/get",(req,res)=>{
  const url =dburl;
  const client=  new MongoClient(url);
  const db = client.db("sms19july24");
  const coll = db.collection("student");
    coll.find({}).toArray()
   .then(result => res.send(result))
   .catch(error => res.send(error));
   
});


app.delete("/delete",(req,res)=>{
 // const url ="mongodb://0.0.0.0:27017";
  const url =dburl;
  const client=  new MongoClient(url);
  const db = client.db("sms19july24");
  const coll = db.collection("student");
  const record ={"_id":req.body.rno};
   coll.deleteOne(record)
   .then(result => res.send(result))
   .catch(error => res.send(error));
   
});

app.put("/update",(req,res)=>{
   const url =dburl;
  const client=  new MongoClient(url);
  const db = client.db("sms19july24");
  const coll = db.collection("student");
  const record ={"name" :req.body.name,"marks" :req.body.marks};
  const filter={"_id":req.body.rno};
   coll.updateOne(filter,{$set:record})
   .then(result => res.send(result))
   .catch(error => res.send(error));
   
});


app.listen(9000, ()=>{console.log("ready @ 9000");});