var express=require('express');
var app=express();
var cors = require('cors');
var optionsCors={"CorsOrigins":"*"}
var bodyParser= require('body-parser')
var helper=require("./helper")

app.set("view engine",'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(optionsCors));

app.get('/',function(req,res){
    res.send('Hello World');
    // console.log(req.body)
    // res.render('index',{title:'Hey',message:'Hello there!'})
});

app.post('/register',function(req,res){
    console.log(req.body)
    const db = helper.sinscrire(req.body)
   
    res.send(req.body)
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000')
});