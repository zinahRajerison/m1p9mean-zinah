import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base_url } from '../environments/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(public http : HttpClient, public toolServ:HelperService) { }
  
  getCommandes () {
    // const options = this.toolServ.formOption();
    
    let body : any = {
      'idResto' : 1
    };
    return this.http.get(base_url+'/findCommande/1');
  }
  updateCommande(toUpdate)
  {
    let body : any = {
      '_id' : toUpdate._id  
    };
    return this.http.put(base_url+'/updateCommande',body);
  }
}
