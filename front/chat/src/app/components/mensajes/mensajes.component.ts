import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: []
})
export class MensajesComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
    // if(localStorage.getItem('usuario')===null)
    //   this._router.navigateByUrl("/");
  }

}
