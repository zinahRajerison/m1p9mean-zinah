import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem,CdkDrag} from '@angular/cdk/drag-drop';
import { RestoService } from 'app/resto.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-traitement-commande',
  templateUrl: './traitement-commande.component.html',
  styleUrls: ['./traitement-commande.component.css']
})
export class TraitementCommandeComponent implements OnInit {
commandesEncours:any[]
commandesAlivrer:any[]
error_msg:string
idResto:number
public isCollapsed = false;
  constructor(public restoServ:RestoService) { }

  ngOnInit(): void {
    this.idResto=parseInt(sessionStorage.getItem("idResto"))
    const success = response => {
      if (response['status'] == 200) {
        this.commandesEncours = response["data"].encours;
        this.commandesAlivrer = response["data"].alivrer;
        this.commandesEncours = this.commandesEncours.map(item => {
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
    this.restoServ.findCommandes(this.idResto).subscribe(success, error);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {
      var toUpdate=this.commandesEncours[event.previousIndex]
      console.log(toUpdate)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateCommande(toUpdate)
    }
  }
  updateCommande(toUpdate)
  {
    const success = response => {
      if (response['status'] == 200) {
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
    this.restoServ.updateCommande(toUpdate._id,"alivrer").subscribe(success, error);
  }
}
