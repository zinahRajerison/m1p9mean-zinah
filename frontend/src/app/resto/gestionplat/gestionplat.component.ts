import { Component, OnInit } from '@angular/core';
import { RestoService } from 'app/resto.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-gestionplat',
  templateUrl: './gestionplat.component.html',
  styleUrls: ['./gestionplat.component.css']
})
export class GestionplatComponent implements OnInit {
plat: Plat
error_msg:string
plats: any[]
idResto:number
modif:boolean
index:0
  constructor(public RestoServ:RestoService,public ClientServ:ClientService) { }

  ngOnInit(): void {
    this.idResto=1
    this.modif=false
    const success = response => {
      if (response['status'] == 200) {
        this.plats=response['data'].plat;
        this.resetForm()
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };
    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    this.ClientServ.getPlats(this.idResto).subscribe(success, error);
  }
  ajouterPlat()
  {
    const success = response => {
      if (response['status'] == 200) {
        this.error_msg=response['message'];
        console.log(this.plat)
        this.plats.push(this.plat)
        this.resetForm()
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };

    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    
    this.RestoServ.ajoutPlat(this.plat.nom,this.plat.details,this.plat.prix,this.plat.benefice,this.idResto)
        .subscribe(success, error);
  }
  deletePlat(idPlat,index){
    const success = response => {
      if (response['status'] == 200) {
        this.error_msg=response['message'];
        this.plats.splice(index,1)
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };

    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    
    this.RestoServ.deletePlat(this.idResto,idPlat)
        .subscribe(success, error)
  }
  editPlat(index)
  {
    this.modif=true;
    this.index=index
    this.plat=this.plats[index];
    console.log(this.plat)
  }
  modifPlat()
  {
     
      const success = response => {
        if (response['status'] == 200) {
          this.plats[this.index]=this.plat
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
      
      this.RestoServ.modifPlat(this.plat.nom,this.plat.details,this.plat.prix,this.plat.benefice,this.plats[this.index]._id,this.idResto)
          .subscribe(success, error);
  }
  resetForm() {
    this.plat = {nom: '', details: '', prix: 0,benefice:0};
   }
}
interface Plat{
  nom,
  details,
  prix,
  benefice
}
