import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validation-commande',
  templateUrl: './validation-commande.component.html',
  styleUrls: ['./validation-commande.component.css']
})
export class ValidationCommandeComponent implements OnInit {
paniers:any[]
total:any
lieuLivraison:string
error_msg:string
  constructor(public ClientServ:ClientService, public router:Router) { }

  ngOnInit(): void {
    this.paniers=this.ClientServ.getPanier();
    this.total=this.ClientServ.getTotal(this.paniers);
  }
  insererCommande()
  {
    console.log(this.lieuLivraison)
    const success = response => {
      if (response['status'] == 200) {
        console.log(response['data']);
        this.ClientServ.viderPanier()
        // redirection
        this.router.navigate(['/examples/landing']);
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };

    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    this.ClientServ.insertCommande(this.paniers,this.lieuLivraison).subscribe(success, error);
  }
}
