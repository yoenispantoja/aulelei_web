import { DTOInternalUser } from './../models/DTOInternalUser';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SocialService } from 'ngx-social-button';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({}),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.apiUrl + '/auth/login'; // url del servicio del API
  urlRegistro = environment.apiUrl + '/auth/register'; // url del servicio del API

  constructor(
    private socialAuthService: SocialService,
    private route: Router,
    private myHttp: HttpClient
  ) {}

  internalRegister(datos: any) {
    const usuario = {
      usuario: {
        nombre: datos.nombre_completo,
        email: datos.email,
        password: datos.password,
      },
    };
    return this.myHttp.post<any>(this.urlRegistro, usuario);
  }

  socialRegister(socialUser: any): Observable<any> {
    const usuario = {
        usuario: {
          nombre: socialUser.name,
          email: socialUser.email,
          password: ':-)',
          img: socialUser.image,
          provider: socialUser.provider
        },
      };
    return this.myHttp.post<any>(this.urlRegistro, usuario);
  }

  login(socialUser: any): Observable<any> {
    let usuario;
    if (socialUser.provider === 'google') {
      usuario = {
        usuario: {
          email: socialUser.email,
          password: ':-)',
          token: socialUser.idToken,
          provider: 'google'
        },
      };
    } else {
      usuario = {
        usuario: {
          email: socialUser.email,
          password: ':-)',
          token: socialUser.accessToken,
          provider: 'facebook'
        },
      };
    }
    return this.myHttp.post<any>(this.url, usuario);
  }

  internalLogin(internalUser: DTOInternalUser) {
    const usuario = {
      usuario: {
        email: internalUser.usuario,
        password: internalUser.contrasenna,
        provider: 'none'
      },
    };
    return this.myHttp.post<any>(this.url, usuario);
  }

  logout() {
    if (this.socialAuthService.isSocialLoggedIn()) {
      this.socialAuthService
        .signOut()
        .then(() => {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        })
        .catch((err) => {});
    }
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  isLogged(): boolean {
    if (
      localStorage.getItem('socialUser') ||
      localStorage.getItem('internalUser')
    ) {
      return true;
    } else {
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
