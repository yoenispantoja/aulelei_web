import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { KeyValueParam } from '../models/key-value-param';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
    contentType: "false",
    processData: "false"
  })
};

@Injectable({
  providedIn: "root"
})
export class CodiguerasService {

  //urls de las codigueras
  urlCategoriasPublicacion = environment.apiUrl + "/categoria-publicacion";
  urlEstadosPublicacion = environment.apiUrl + "/estado-publicacion";
  urlCategoriasGalerias = environment.apiUrl + "/galeria/categorias";
  urlEstadosGalerias = environment.apiUrl + "/galeria/estados";



  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de las categorias de las publicaciones
  getCategoriasPublicacion():Observable<any[]> {
    return this.myHttp.get<any[]>(this.urlCategoriasPublicacion);
  }

   // Devuelve la lista de los estados de las publicaciones
   getEstadosPublicacion():Observable<any[]> {
    return this.myHttp.get<any[]>(this.urlEstadosPublicacion);
  }

   // Devuelve la lista de las categorias de las galerias
   getCategoriasGaleria():Observable<any[]> {
    return this.myHttp.get<any[]>(this.urlCategoriasGalerias);
  }

  // Devuelve la lista de las categorias de las galerias
  getEstadosGaleria(): Observable<any[]> {
    return this.myHttp.get<any[]>(this.urlEstadosGalerias);
  }




}
