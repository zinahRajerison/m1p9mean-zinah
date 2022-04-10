import { Component, OnInit } from '@angular/core';
import { RestoService } from 'app/resto.service';
import { EkalyService } from 'app/ekaly.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  commandes:any[]
  error_msg:string
    constructor(public restoServ:RestoService,public ekalyServ:EkalyService) { }
  
    ngOnInit(): void {
      var idLivreur=sessionStorage.getItem("personne")
      const success = response => {
        if (response['status'] == 200) {
          this.commandes = response["data"];
          
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.ekalyServ.getCommandeLivreur(idLivreur).subscribe(success, error);
    }
    livrer(idCommande){
      const success = response => {
        if (response['status'] == 200) {
          this.commandes = response["data"];
          
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.restoServ.updateCommande(idCommande,"livre").subscribe(success, error);
    }
  
}
