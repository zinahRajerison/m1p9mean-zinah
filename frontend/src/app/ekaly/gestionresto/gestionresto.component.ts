import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EkalyService } from 'app/ekaly.service';
import { ClientService } from 'app/client.service';
import * as _ from 'lodash';

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
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
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
      this.resto.logo=(this.cardImageBase64)
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
    fileChangeEvent(fileInput: any) {
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (fileInput.target.files[0].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];

                  console.log(img_height, img_width);


                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.cardImageBase64 = imgBase64Path;
                      this.isImageSaved = true;
                      // this.previewImagePath = imgBase64Path;
                  }
              };
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
    }
    removeImage() {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    }
  }

interface Resto{
  nomResto,adresse ,details,logo,
  username,
  mail ,
  mdp
}
