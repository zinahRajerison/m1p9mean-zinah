import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { base_url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  constructor(public http : HttpClient, public toolServ:HelperService) { }
  
  getLivreurs () {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/getLivreurs');
  }
  ajoutLivreur(username,mail,mdp)
  {
    let body: any ={
      'toUpdate': {
        'username':username,
        'mail':mail,
        'mdp':mdp
      }
      
    }
    return this.http.post(base_url+'/ajoutlivreur',body)
  }
  
  modifLivreur(username,mail,mdp,idlivreur)
  {
    let body: any ={
      '_id':idlivreur,
      'toUpdate': {
        'username':username,
        'mail':mail,
        'mdp':mdp
      }
    }
    console.log(body)
    return this.http.put(base_url+'/modifLivreur',body)
  }
  deleteLivreur(idlivreur)
  {
    let body:any={
      '_id':idlivreur
    }
    console.log(body)
    return this.http.post(base_url+'/deletelivreur',body)
  }
}
