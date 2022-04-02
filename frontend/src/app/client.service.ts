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
  connect (mail : string, mdp : string) {
    const options = this.toolServ.formOption();
    
    let body : any = {
      'mail' : mail,
      'mdp' : mdp
    };
    return this.http.post(base_url + '/Client/login', body, options);
  }
}
