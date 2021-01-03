import { DTOInternalUser } from './../shared/models/DTOInternalUser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  @ViewChild('alertSwal', { static: true }) private alertSwal: SwalComponent;
  usuario = '';
  contrasenna = '';
  constructor(
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {}

  onLoggedin() {
    const internalUser: DTOInternalUser = {
      usuario: this.usuario,
      contrasenna: this.contrasenna
    };
    this.loginService.internalLogin(internalUser).subscribe(data => {
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
    this.loginService.login(socialUser).subscribe(data => {
      if (data.status === 200) {
        // Guardo los datos en el localsotore
        localStorage.setItem('socialUser', JSON.stringify(data.items));
        localStorage.setItem('token', data.items.token);
        this.route.navigateByUrl('/admin/dashboard');
      } else {
        this.alertSwal.show();
        this.route.navigateByUrl('/login');
      }
    });
  }
}
