import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class GuardMensajesService implements CanActivate {

    constructor(private _router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (localStorage.getItem('usuario')===null) {
            console.log('LOGUEATE PE\' MASCOTA');
            this._router.navigate(['/']);
            return false;
        }
        return true;
    }
}
