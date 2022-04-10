import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';
import { MapsAPILoader } from '@agm/core';
import { EkalyService } from 'app/ekaly.service';

@Component({
  selector: 'app-gestionlivreur',
  templateUrl: './gestionlivreur.component.html',
  styleUrls: ['./gestionlivreur.component.css']
})
export class GestionlivreurComponent implements OnInit {
  livreur: Livreur
  error_msg:string
  livreurs: any[]
  modif:boolean
  index:0
    constructor(public LivreurServ:EkalyService) { }
  
    ngOnInit(): void {
      const success = response => {
        if (response['status'] == 200) {
          this.livreurs=response['data'].users;
          console.log("data"+this.livreurs)
          this.resetForm()
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.LivreurServ.getLivreurs().subscribe(success, error);
    }
    ajouterlivreur()
    {
      const success = response => {
        if (response['status'] == 200) {
          this.error_msg=response['message'];
          console.log(this.livreur)
          this.livreurs.push(this.livreur)
          this.resetForm()
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      
      this.LivreurServ.ajoutLivreur(this.livreur.username,this.livreur.mail,this.livreur.mdp)
          .subscribe(success, error);
    }
    deleteLivreur(idLivreur,index){
      const success = response => {
        if (response['status'] == 200) {
          this.error_msg=response['message'];
          this.livreurs.splice(index,1)
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      
      this.LivreurServ.deleteLivreur(idLivreur)
          .subscribe(success, error)
    }
    editLivreur(index)
    {
      this.modif=true;
      this.index=index
      this.livreur=this.livreurs[index];
      console.log(this.livreur)
    }
    modiflivreur()
    {
        const success = response => {
          if (response['status'] == 200) {
            this.livreurs[this.index]=this.livreur
            this.resetForm()
            this.modif=false
          } else {
            this.error_msg = 'Erreur connexion';
          }
          console.log(response);
        };
    
        const error = response => {
          this.error_msg = 'Erreur connexion';
        };
        
        this.LivreurServ.modifLivreur(this.livreur.username,this.livreur.mail,this.livreur.mdp,this.livreurs[this.index]._id,)
            .subscribe(success, error);
    }
    resetForm() {
      this.livreur = {username: '', mail: '', mdp: ''};
      this.modif=false
     }
  }
  interface Livreur{
    username,
    mail,
    mdp
  }