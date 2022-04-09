import { Component, OnInit } from '@angular/core';
import { EkalyService } from 'app/ekaly.service';

@Component({
  selector: 'app-commande-livraison',
  templateUrl: './commande-livraison.component.html',
  styleUrls: ['./commande-livraison.component.css']
})
export class CommandeLivraisonComponent implements OnInit {
commandes:any[]
error_msg:string
  constructor(public ekalyServ:EkalyService) { }

  ngOnInit(): void {
    
    const success = response => {
      if (response['status'] == 200) {
        this.commandes = response["data"];
        this.commandes = this.commandes.map(item => {
          item.show = false;
          return item;
         })
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
    this.ekalyServ.getCommandes().subscribe(success, error);
  }

}
