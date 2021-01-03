import { DTOInternalUser } from './../shared/models/DTOInternalUser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [routerTransition()]
})
export class RegistroComponent implements OnInit {
  @ViewChild('alertSwal', { static: true }) private alertSwal: SwalComponent;

  usuario = '';
  email = '';
  contrasenna = '';
  repetir_contrasenna = '';

  constructor(
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {}

  onLoggedin() {
    const internalUser = {
      nombre_completo: this.usuario,
      email: this.email,
      password: this.contrasenna
    };

    this.loginService.internalRegister(internalUser).subscribe(data => {
      if (data.status === 200) {
        // Guardo los datos en el localsotore
        localStorage.setItem('socialUser', JSON.stringify(data.items));
        localStorage.setItem('token', data.items.token);
        this.route.navigateByUrl('/admin/dashboard');
      } else {
        this.route.navigateByUrl('/login');
      }
    });
  }

  signOut() {
    this.loginService.logout();
  }

  getSocialUser(socialUser) {
    this.loginService.socialRegister(socialUser).subscribe(data => {
      if (data.status === 200) {
        // Guardo los datos en el localsotore
        localStorage.setItem('socialUser', JSON.stringify(data.items));
        localStorage.setItem('token', data.items.token);
        this.route.navigateByUrl('/admin/dashboard');
      } else {
        this.route.navigateByUrl('/login');
      }
    });
  }
}

