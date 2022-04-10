import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { base_url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EkalyService {

  constructor(public http : HttpClient, public toolServ:HelperService) { }
  
  getLivreurs () {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/getLivreurs');
  }
  getCommandes () {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/findAllCommande');
  }
  assignerCommande(livreur,commande){
    let body: any ={
      '_id':commande._id,
      'toUpdate': {
        'livreur':livreur._id,
        'status':"enlivraison"
      }
    }
    return this.http.put(base_url+'/assignerCommande',body);
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
  ajoutResto(resto)
  {
    let body: any ={
        'nomResto':resto.nomResto,
        'adresse':resto.adresse,
        'details':resto.details,
        'logo':resto.logo,
        'responsable':[{
          '_id':1,
          'username':resto.username,
          'mail':resto.mail,
          'mdp':resto.mdp
        }]
    }
    return this.http.post(base_url+'/ajoutResto',body)
  }
  
  modifResto(resto)
  {
    let body: any ={
      '_id':resto._id,
      'toUpdate': {
        'nomResto':resto.nomResto,
        'adresse':resto.adresse,
        'details':resto.details,
        'logo':resto.logo
      }
    }
    console.log(body)
    return this.http.put(base_url+'/modifResto',body)
  }
  deleteResto(idResto)
  {
    let body:any={
      '_id':idResto
    }
    console.log(body)
    return this.http.post(base_url+'/deleteResto',body)
  }
  getCommandeLivreur(idlivreur) {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/findCommandeLivreur/'+idlivreur);
  }
}
