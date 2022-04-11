import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestoService } from 'app/resto.service';

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
idCommande:string
  constructor(public ClientServ:ClientService, public router:Router,public route:ActivatedRoute,public restoServ:RestoService) { }

  ngOnInit(): void {
    this.paniers=this.ClientServ.getPanier();
    this.total=this.ClientServ.getTotal(this.paniers);
    this.idCommande =this.route.snapshot.paramMap.get('id')
    if((this.idCommande)!=null){
      const success = response => {
        if (response['status'] == 200) {
        alert("Commande validee");
        console.log(response['data']);
        this.ClientServ.viderPanier()
        // redirection
        this.router.navigate(['/index']);
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };

      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.restoServ.updateCommande(this.idCommande,"encours").subscribe(success, error);
    }
  }
  insererCommande()
  {
    var user=sessionStorage.getItem("personne");
    if(user==null)
    {
        alert("Veuillez d'abord vous connectez pour valider la commande");
        this.router.navigate(['/examples/login']);
    }
    else{
      console.log(this.lieuLivraison)
      const success = response => {
        if (response['status'] == 200) {
            this.idCommande=response['data'];
            var Juser= JSON.parse(user)
              const success = response => {
                if (response['status'] == 200) {
                  alert("Veuillez confirmer votre commande via email");
                } else {
                  this.error_msg = 'Erreur connexion';
                }
                console.log(response);
              };
      
              const error = response => {
                this.error_msg = 'Erreur connexion';
              };
          this.ClientServ.sendMail(Juser.mail,this.idCommande).subscribe(success, error);
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
}
