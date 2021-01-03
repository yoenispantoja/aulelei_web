import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {

    }
    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        // Chequeo el rol del usuario
        if (JSON.parse(localStorage.getItem('socialUser'))) {
          const rol = JSON.parse(localStorage.getItem('socialUser')).rol.id;
          if (rol && this.loginService.isLogged() && rol !== 6) {
              return true;
          } else {
            this.loadSwal();
          }
        }
        this.router.navigate(['/login']);
        return false;

    }

    loadSwal() {
      swal({
        title: 'Atención',
        text: 'Usted no tiene permiso para acceder',
        type: 'error',
        showConfirmButton: true
      })
      .then((result) => {
        this.router.navigate(['/login']);
      });
    }
}
