import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  url = environment.apiUrl + '/reserva'; // url del reserva del API

  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los reservas
  getReservas() {
    return this.myHttp.get(this.url);
  }

   // Devuelve la lista de los reservas
   getReservasTrabajador(idTrabajador: number) {
    return this.myHttp.get(this.url + '/trabajador/' + idTrabajador);
  }

  // Adiciona un reserva
  addReserva(reserva: any) {
    return this.myHttp.post(this.url, reserva);
  }

  // Carga los datos de un reserva
  showReserva(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un reserva
  editReserva(id: number, reserva: any) {
    return this.myHttp.put(this.url + '/' + id, reserva);
  }

  // Elimina un reserva
  deleteReserva(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }



}


