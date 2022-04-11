import { Component, OnInit } from '@angular/core';
import { RestoService } from 'app/resto.service';
import { ClientService } from 'app/client.service';
import * as _ from 'lodash';

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
imageError: string;
isImageSaved: boolean;
cardImageBase64: string;
  constructor(public RestoServ:RestoService,public ClientServ:ClientService) { }

  ngOnInit(): void {
    this.idResto=Number(sessionStorage.getItem("idResto"))
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
    
    this.RestoServ.ajoutPlat(this.plat.nom,this.plat.details,this.plat.prix,this.plat.benefice,this.cardImageBase64,this.idResto)
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
      
      this.RestoServ.modifPlat(this.plat.nom,this.plat.details,this.plat.prix,this.plat.benefice,this.cardImageBase64,this.plats[this.index]._id,this.idResto)
          .subscribe(success, error);
  }
  resetForm() {
    this.plat = {nom: '', details: '', prix: 0,benefice:0};
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
interface Plat{
  nom,
  details,
  prix,
  benefice
}
