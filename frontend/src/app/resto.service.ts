import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base_url } from '../environments/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(public http : HttpClient, public toolServ:HelperService) { }
  
  findCommandes (idResto) {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/findCommande/'+idResto);
  }
  updateCommande(toUpdate,status)
  {
    console.log("livraison"+toUpdate)
    let body : any = {
      '_id' : toUpdate,
      'status':status 
    };
    return this.http.put(base_url+'/updateCommande',body);
  }
  ajoutPlat(nomPlat,detailsPlat,prix,benefice,logo,idResto)
  {
    let body: any ={
      '_id':idResto,
      'toUpdate': {
        'nom':nomPlat,
        'details':detailsPlat,
        'prix':prix,
        'benefice':benefice,
        "img":logo
      }
      
    }
    return this.http.post(base_url+'/ajoutPlat',body)
  }
  
  modifPlat(nomPlat,detailsPlat,prix,benefice,logo,idPlat,idResto)
  {
    let body: any ={
      '_id':idResto,
      'toUpdate': {
        'nom':nomPlat,
        'details':detailsPlat,
        'prix':prix,
        'benefice':benefice,
        'img':logo,
        'idPlat':idPlat
      }
      
    }
    return this.http.put(base_url+'/modifPlat',body)
  }
  deletePlat(idResto,idPlat)
  {
    let body:any={
      '_id':idResto,
      'idPlat':idPlat
    }
    console.log(body)
    return this.http.post(base_url+'/deletePlat',body)
  }
}
