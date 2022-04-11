import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
paniers:any[]
error_msg:string
public gfg = false;

  constructor(public ClientServ:ClientService,public router : Router) { }

  ngOnInit(): void {
    this.paniers=this.ClientServ.getPanier();
  }
  validerCommande(){
    var user=sessionStorage.getItem("personne");
    if(user==null)
    {
        alert("Veuillez d'abord vous connectez pour valider la commande");
        this.router.navigate(['/examples/login']);
    }
    else{
      var Juser= JSON.parse(user)
      const success = response => {
        if (response['status'] == 200) {
        alert("Veuillez confirmer votre commande via email");
        // this.router.navigate(['/examples/validationCommande']);
          // redirection
          // this.router.navigate(['/menu-jour']);
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };

      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.ClientServ.sendMail(Juser.mail).subscribe(success, error);
      }
  }
  enlever(idResto,idPlat)
  {
    var aenlever=JSON.parse(localStorage.getItem(idResto+idPlat));
    if((aenlever.nbre-1)<0){
      aenlever.nbre=0
    }
    else{
      aenlever.nbre=aenlever.nbre-1
    }
    localStorage.setItem(idResto+idPlat,JSON.stringify(aenlever))
    window.location.reload()
  }
  ajouter(idResto,idPlat)
  {
    this.ClientServ.ajoutQte(idResto,idPlat)
    window.location.reload()
  }
  effacer(idResto,idPlat)
  {
    localStorage.removeItem(idResto+idPlat)
    window.location.reload()
  }

}
