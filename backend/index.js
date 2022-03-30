var express=require('express');
var app=express();
var cors = require('cors');
var optionsCors={"CorsOrigins":"*"}
var bodyParser= require('body-parser')
var helper=require("./Helper.js")
var func=require("./Function.js")

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
    var connex=new helper();
    console.log(req.body)
    connex.sinscrire(req.body,'test')
   
    res.send(req.body)
});

app.get('/findResto',function(req,res){
    var fonc=new func();
    console.log(req.body)
    fonc.findAll('test').then(function(results){
        res.send(results);
    }).catch( error => console.error(error))
    // console.log(req.body)
    // res.render('index',{title:'Hey',message:'Hello there!'})
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000')
});