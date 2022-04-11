import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-inscri',
  templateUrl: './inscri.component.html',
  styleUrls: ['./inscri.component.css']
})
export class InscriComponent implements OnInit {
  data : Date = new Date();
  error_msg='';
  prenom='';
  nom='';
  mail='';
  username=''
  mdp='';
  checkbox='';
  constructor(public clientServ:ClientService) { }

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
  
  submit(login:any){
    
    const success = response => {
      if (response['status'] == 200) {
        this.error_msg=response['message'];
        // redirection
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };

    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    
    console.log(login);
    this.clientServ.sinscrire(this.nom,this.prenom,this.mail,this.mdp,this.username)
        .subscribe(success, error);
  }
}
