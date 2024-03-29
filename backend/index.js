var express=require('express');
var app=express();
var cors = require('cors');
var optionsCors={"CorsOrigins":"*"}
var bodyParser= require('body-parser')
var helper=require("./Helper.js")
var func=require("./Function.js")
var reponse=require("./Response.js")
var client=require('./Client.js')
var plat=require('./Plat.js')
var mailFunc=require('./functionMail.js')
var livreur=require('./Livreur.js')
var Resto=require('./Resto.js')

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
    connex.sinscrire(req.body,'typeuser')
    res.send(new reponse(200,"Inscription terminee",null))
});

app.post('/login',function(req,res){
    // var customer=new client(req.body.mail,req.body.mdp)
    // console.log(customer.mail)
    if(parseInt(req.body.typeuser)==0){
        new Resto().seLogger(req.body.mail,req.body.mdp).then(function(user){
            res.send(new reponse(200,"Connected",user))
        }).catch(function(error){
            res.send(new reponse(400,error,null))
        })
    }
    else{
        new func().seLogger(req.body.mail,req.body.mdp,parseInt(req.body.typeuser)).then(function(user){
            res.send(new reponse(200,"Connected",user))
        }).catch(function(error){
            res.send(new reponse(400,error,null))
        })
    }
});

app.post('/sendMail',function(req,res){
    var connex=new func();
    console.log(req.body)
    connex.sendMail(req.body.mail).then(function(result){
        res.send(new reponse(200,"Mail sent successfully",null))
    }).catch(function(error){
        res.send(400,error,null)
    })
    
});
app.post('/mail',function(req,res){
    mailFunc.sendMail(req.body.mail,req.body.mailContent)
    res.send(new reponse(200,"Mail sent successfully",null))
})
app.get('/findResto',function(req,res){
    var fonc=new func();
    console.log(req.body)
    fonc.findAll('resto').then(function(results){
    var toRespond =new reponse(200,"Data gotten successfully",results);
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
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});

app.post('/insertCommande',function(req,res){
    var connex=new helper();
    connex.insert(req.body,'commande').then(function(result){
        console.log(result);
        res.send(new reponse(200,"Commande validee",result))
    }).catch(function(err){
        res.send(new reponse(400,err,null))
    })
});
app.get('/findCommande/:id',function(req,res){
    var fonc=new func();
    var idResto = Number(req.params.id);
    fonc.findCommande(idResto).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});

app.put('/updateCommande',function(req,res){
    var fonc=new func();
    console.log("idCommande"+req.body._id)
    fonc.updateCommande(req.body._id,req.body.status).then(function(results){
    var toRespond = new reponse(200,"Commande updated successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.post('/ajoutPlat',function(req,res){
    var plats=new plat();
    console.log(req.body)
    plats.ajoutPlat(req.body)
    res.send(new reponse(200,"Plat ajoute",null))
});
app.post('/deletePlat',function(req,res){
    var plats=new plat();
    console.log("body"+req.body._id)
    plats.deletePlat(req.body._id,req.body.idPlat).then(function(result)
    {
        res.send(new reponse(200,"Plat efface",null))
    }).catch(function(error){
        res.send(new reponse(400,"error",null))
    })
   
})
app.put('/modifPlat',function(req,res)
{
    var plats=new plat();
    console.log(req.body)
    plats.updatePlat(req.body).then(function(results){
    var toRespond = new reponse(200,"Plat updated successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
})

app.get('/getLivreurs',function(req,res){
    var fonc=new func();
    fonc.findLivreurs(3).then(function(results){
        var toRespond =new reponse(200,"Data gotten successfully",results);
        res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.put('/modifLivreur',function(req,res)
{
    new func().updateLivreur(req.body).then(function(results){
    var toRespond = new reponse(200,"Livreur updated successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
})

app.post('/ajoutLivreur',function(req,res){
    new func().ajoutLivreur(req.body)
    res.send(new reponse(200,"Livreur ajoute",null))
});

app.post('/deleteLivreur',function(req,res){
    new func().deleteLivreur(req.body._id).then(function(result)
    {
        res.send(new reponse(200,"Livreur efface",null))
    }).catch(function(error){
        res.send(new reponse(400,"error",null))
    })
})
app.put('/modifResto',function(req,res)
{
    new Resto().updateResto(req.body).then(function(results){
    var toRespond = new reponse(200,"Resto updated successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
})
app.post('/ajoutResto',function(req,res){
    new Resto().ajoutResto(req.body)
    res.send(new reponse(200,"Resto ajoute",null))
});
app.post('/deleteResto',function(req,res){
    new Resto().deleteResto(req.body._id).then(function(result)
    {
        res.send(new reponse(200,"Resto efface",null))
    }).catch(function(error){
        res.send(new reponse(400,"error",null))
    })
})
app.get('/findAllCommande',function(req,res){
    var fonc=new func();
    fonc.findAllCommande().then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.put('/assignerCommande',function(req,res){
    var fonc=new func();
    console.log(req.body)
    fonc.assignerCommande(req.body).then(function(results){
    var toRespond = new reponse(200,"Commande updated successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.get('/findCommandeLivreur/:id',function(req,res){
    var fonc=new func();
    var idLivreur = Number(req.params.id);
    fonc.findCommandeLivreur(idLivreur).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.post('/rechercherResto',function(req,res){
    new Resto().rechercherResto(req.body).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.post('/rechercherPlat',function(req,res){
    new plat().rechercherPlat(req.body).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.post('/getStatParJour',function(req,res){
    new Resto().getStatParJour(req.body.idResto).then(function(results){
    var toRespond = new reponse(200,"Data gotten successfully",results);
    res.send(toRespond);
    }).catch( function(error){
        var toRespond =new reponse(400,error,null);
        res.send(toRespond)
    })
});
app.listen(process.env.PORT,function(){
    console.log('Example app listening on port 3000')
});