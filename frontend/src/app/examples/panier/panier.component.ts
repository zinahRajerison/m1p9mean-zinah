import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
paniers:any[]
error_msg:string
  constructor(public ClientServ:ClientService) { }

  ngOnInit(): void {
    this.paniers=this.ClientServ.getPanier();
  }
  

}
