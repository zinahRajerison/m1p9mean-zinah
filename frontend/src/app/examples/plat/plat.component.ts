import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ClientService} from '../../client.service';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
idResto:number
plats: any[]
error_msg:string
indexPlat:any
  constructor(private route:ActivatedRoute,public ClientServ:ClientService) { }

  ngOnInit(): void {
    this.idResto = parseInt(this.route.snapshot.paramMap.get('id'))
    console.log(this.idResto)
    const success = response => {
      if (response['status'] == 200) {
        this.plats = response["data"].plat;
        console.log(this.plats);
        this.plats = this.plats.map(item => {
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
    this.ClientServ.getPlats(this.idResto).subscribe(success, error);
  }
  ajouterPanier(panier)
  {
    var exResto=parseInt(sessionStorage.getItem("idResto"))
    console.log(exResto)
    if(exResto==this.idResto||isNaN(exResto))
    {
      var ainserer=this.plats[panier]
      if(localStorage.getItem(this.idResto+ainserer._id)==null)
      {
        console.log("panier"+this.idResto+ainserer._id)
        ainserer.nbre=1   
        ainserer.idResto=this.idResto
        localStorage.setItem(ainserer.idResto+ainserer._id,JSON.stringify(ainserer));
        sessionStorage.setItem("idResto",this.idResto.toString())
      }
      else{
        this.ClientServ.ajoutQte(this.idResto,ainserer._id)
      }
    }
    else{
      var val=confirm("Vous etes sur le point de changer de restaurant, voulez-vous donc vider votre panier?\nEither vider or annuler");
      if(val==true){
        this.ClientServ.viderPanier()
        this.ajouterPanier(panier)
      }
    }
   
  }
}
