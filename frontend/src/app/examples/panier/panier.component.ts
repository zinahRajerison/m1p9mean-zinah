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
    var user=sessionStorage.getItem("user");
    if(user==null)
    {
        alert("Veuillez d'abord vous connectez pour valider la commande");
        this.router.navigate(['/examples/login']);
    }
    else{
      alert("Veuillez confirmer votre commande via email");
      this.router.navigate(['/examples/validationCommande']);
    }
  }

}
