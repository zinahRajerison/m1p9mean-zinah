import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EkalyService } from 'app/ekaly.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-gestionresto',
  templateUrl: './gestionresto.component.html',
  styleUrls: ['./gestionresto.component.css']
})
export class GestionrestoComponent implements OnInit {
  resto: Resto
  error_msg:string
  restos: any[]
  modif:boolean
  index:0
    constructor(public restoServ:EkalyService,public clientServ:ClientService) { }
  
    ngOnInit(): void {
      this.modif=false
      const success = response => {
        if (response['status'] == 200) {
          this.restos=response['data'];
          this.resetForm()
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      this.clientServ.getRestos().subscribe(success, error);
    }
    ajouterResto()
    {
      const success = response => {
        if (response['status'] == 200) {
          this.error_msg=response['message'];
          console.log(this.resto)
          this.restos.push(this.resto)
          this.resetForm()
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      
      this.restoServ.ajoutResto(this.resto)
          .subscribe(success, error);
    }
    deleteResto(idresto,index){
      const success = response => {
        if (response['status'] == 200) {
          this.error_msg=response['message'];
          this.restos.splice(index,1)
        } else {
          this.error_msg = 'Erreur connexion';
        }
        console.log(response);
      };
  
      const error = response => {
        this.error_msg = 'Erreur connexion';
      };
      
      this.restoServ.deleteResto(idresto)
          .subscribe(success, error)
    }
    editResto(index)
    {
      this.modif=true;
      this.index=index
      this.resto=this.restos[index];
      console.log(this.resto)
    }
    modifResto()
    {
        const success = response => {
          if (response['status'] == 200) {
            this.restos[this.index]=this.resto
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
        
        this.restoServ.modifResto(this.resto)
            .subscribe(success, error);
    }
    resetForm() {
      this.resto = {nomResto: '', adresse: '', details: '',logo:'',username:'',mail:'',mdp:''};
     }
  }

interface Resto{
  nomResto,adresse ,details,logo,
  username,
  mail ,
  mdp
}
