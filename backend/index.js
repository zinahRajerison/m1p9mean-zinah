var express=require('express');
var app=express();
var cors = require('cors');
var optionsCors={"CorsOrigins":"*"}
var bodyParser= require('body-parser')
var helper=require("./Helper.js")
var func=require("./Function.js")
var reponse=require("./Response.js")
var client=require('./Client.js')

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
    res.send(new reponse(200,"Inscription terminee",null))
});

app.post('/login',function(req,res){
    // var customer=new client(req.body.mail,req.body.mdp)
    // console.log(customer.mail)
    new func().seLogger(req.body.mail,req.body.mdp).then(function(user){
        res.send(new reponse(200,"Mail sent successfully",user))
    }).catch(function(error){
        res.send(new reponse(300,error,null))
    })
});

app.post('/sendMail',function(req,res){
    var connex=new func();
    console.log(req.body)
    connex.sendMail(req.body.mail)
    res.send(new reponse(200,"Mail sent successfully",null))
});
app.get('/findResto',function(req,res){
    var fonc=new func();
    console.log(req.body)
    fonc.findAll('resto').then(function(results){
    var toRespond =new reponse(200,"Data gotten successfully",results);
    // toRespond.setStatus(200);
    // toRespond.setMessage("Data gotten successfully");
    // toRespond.setData(results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});

app.get('/findPlat/:id',function(req,res){
    var fonc=new func();
    var idResto = Number(req.params.id);
    console.log(idResto)
    fonc.findPlat(idResto).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    // toRespond.setStatus(200);
    // toRespond.setMessage("Data gotten successfully");
    // toRespond.setData(results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});

app.post('/insertCommande',function(req,res){
    var connex=new helper();
    console.log(req.body)
    connex.insert(req.body,'commande')
    res.send(new reponse(200,"Commande validee",null))
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000')
});