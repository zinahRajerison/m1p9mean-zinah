import { Component, OnInit } from '@angular/core';
import { EkalyService } from 'app/ekaly.service';
import {ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-commande-livraison',
  templateUrl: './commande-livraison.component.html',
  styleUrls: ['./commande-livraison.component.css']
})
export class CommandeLivraisonComponent implements OnInit {
commandes:any[]
error_msg:string
closeResult:string
livreurs:any[]
idLivreur:any
idCommande:any
  constructor(public ekalyServ:EkalyService,private modalService:NgbModal ) { }

  ngOnInit(): void {
    
    const success = response => {
      if (response['status'] == 200) {
        this.commandes = response["data"];
        const success = response => {
          if (response['status'] == 200) {
            this.livreurs = response["data"].users;
            console.log(this.livreurs)
          } else {
            this.error_msg = 'Erreur connexion';
          }
          console.log(response);
        };
    
        const error = response => {
          this.error_msg = 'Erreur connexion';
        };
        this.ekalyServ.getLivreurs().subscribe(success, error);
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
  openAssignation(content,index:number) {
    this.idCommande=index
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  assigner(){
    console.log("livreur"+this.idLivreur+""+this.idCommande)
    const success = response => {
      if (response['status'] == 200) {
        this.modalService.dismissAll()
        this.commandes.splice(this.idCommande,1)
      } else {
        this.error_msg = 'Erreur connexion';
      }
      console.log(response);
    };

    const error = response => {
      this.error_msg = 'Erreur connexion';
    };
    this.ekalyServ.assignerCommande(this.livreurs[this.idLivreur],this.commandes[this.idCommande]).subscribe(success, error);
    // this.ekalyServ.assignerCommande(this.assignation.idLivreur,this.assignation.idCommande)
  }
}
interface assignation{
  idLivreur
  idCommande
}
