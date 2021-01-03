import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  url = environment.apiUrl + '/servicio'; // url del servicio del API

  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los categorias
  getResumen() {
    return this.myHttp.get(this.url + '/resumen');
  }
}
