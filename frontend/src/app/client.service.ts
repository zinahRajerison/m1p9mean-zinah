import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base_url } from '../environments/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http : HttpClient, public toolServ:HelperService) { }
  
  sinscrire(nom:any,prenom:any,mail:any,mdp:any){
    // const options = this.toolServ.formOption(true);
    
    let body : any = {
      'nom' : nom,
      'prenom' : prenom,
      'mail':mail,
      'mdp':mdp
    };
    console.log(body);
    return this.http.post(base_url + '/register', body);
  }
  
  getRestos () {
    // const options = this.toolServ.formOption();
    return this.http.get(base_url+'/findResto');
  }
  getPlats(idResto){
    console.log("idResto"+idResto)
    return this.http.get(base_url+'/findPlat/'+idResto);
  }
  getPanier()
  {
    var values=[],
      keys=Object.keys(localStorage),
      i=keys.length;
    while(i--){
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    console.log(values);
    return values;
  }
  viderPanier()
  {
    localStorage.clear();
    sessionStorage.removeItem("idResto");
  }
  ajoutQte(idResto,idPlat)
  {
    var aenlever=JSON.parse(localStorage.getItem(idResto+idPlat));
    aenlever.nbre=aenlever.nbre+1
    localStorage.setItem(idResto+idPlat,JSON.stringify(aenlever))
  }
  getTotal(paniers)
  {
    var total=0
    for(let i=0;i<paniers.length;i++)
    {
       total=total+(paniers[i].prix*paniers[i].nbre)
    }
    return total+3000;
  }
  connect (mail : string, mdp : string,typeuser:number) {
    const options = this.toolServ.formOption();
    
    let body : any = {
      'mail' : mail,
      'mdp' : mdp,
      "typeuser":typeuser
    };
    return this.http.post(base_url + '/login', body, options);
  }
  insertCommande(paniers,lieuLivraison)
  {
    let body:any ={
      'client':sessionStorage.getItem("personne"),
      'lieuLivraison':lieuLivraison,
      'plats':paniers,
      'status':'encours',
      'dateCommande': Date.now()
    };
    console.log(body);
    return this.http.post(base_url + '/insertCommande', body);
  }
}