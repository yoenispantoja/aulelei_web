import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

let urlMedias = environment.apiMedias + 'medias/';

@Injectable({
  providedIn: "root",
})
export class MediasService {
  url = environment.apiUrl + "/media"; // url del servicio del API

  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los medias
  getMedias() {
    return this.myHttp.get(this.url);
  }

  // Adiciona un media
  addMedia(media: any) {
    return this.myHttp.post(this.url, media);
  }

  // Actualiza un media
  editMedia(id: number, media: any) {
    return this.myHttp.put(this.url + "/" + id, media);
  }

  // Elimina un media
  deleteMedia(id: number) {
    return this.myHttp.delete(this.url + "/" + id);
  }

  //Configuración de las columnas de la tabla de medias

  getColumnasTablaMedias() {
    return [
      {
        data: function (row, type, set) {
          return (
            '<img style="object-fit: cover" width="100px" height="60px" src="' +
            urlMedias + row.nombre +
            '">'
          );
        },
        // tslint:disable-next-line: quotemark
        className: "text-center"
      },
      {
        data: "nombre",
        className: "text-center",
      },
      {
       data: function (row, type, set) {
          return (
            (row.tamanno /1024).toFixed(2) +' kB'
          );
        },
        className: "text-center",
      },
      {
        data: "mime_type",
        className: "text-center",
      },
      {
        data: "publicadaPor.nombre",
        className: "text-center"
      }
    ];
  }
}
