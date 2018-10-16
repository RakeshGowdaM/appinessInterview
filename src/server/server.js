const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT=3000;
const app=express();

app.use(bodyParser());
app.use(cors());

app.get('/',function(req,res){
    res.send("Data from server");
});

app.post('/login',function(req,res){
    console.log(data.res);
    res.status(200).send({'message':'Data received'});
});

app.listen(PORT,function(){
    console.log("Server is running on post - "+ PORT);
});