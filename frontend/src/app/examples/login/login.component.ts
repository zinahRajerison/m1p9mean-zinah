import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';
import { HelperService } from 'app/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    mail:string
    mdp:string
    typeuser:number
    error_msg:string
    constructor(public ClientServ:ClientService,public toolServ:HelperService,public router:Router) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    selogger(){
    const success = response => {
        if (response['status'] == 200) {
            const user = response['data'];
            console.log("typeuser"+this.typeuser)
           if(this.typeuser==0)
           {
                sessionStorage.setItem("idResto",JSON.stringify(user._id));
                this.router.navigate(['/resto/commande']);
           }
           if(this.typeuser==1){
                console.log("one")
                sessionStorage.setItem("personne",JSON.stringify(user));
                this.toolServ.setUser(user);
                this.router.navigate(['/examples/restos']);
           }
            if(this.typeuser==2){
                sessionStorage.setItem("personne",JSON.stringify(user));
                this.toolServ.setUser(user);
                this.router.navigate(['/ekaly/livreurs']);
            } 
            if(this.typeuser==3){
                sessionStorage.setItem("personne",JSON.stringify(user._id));
                this.toolServ.setUser(user);
                this.router.navigate(['/livreur/commande']);
            }           
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
  
      this.ClientServ.connect(this.mail, this.mdp,this.typeuser)
          .subscribe(success, error);
    }

}
