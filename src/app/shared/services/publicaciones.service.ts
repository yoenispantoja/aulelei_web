import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DTOPublicacion } from '../models/DTOPublicacion';

const urlFotosDestacadas = environment.apiMedias + '/publicaciones/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  url = environment.apiUrl + '/publicacion'; // url del servicio del API
  urlUpload = environment.apiUrl + '/publicacion/upload_image_post'; // url del servicio del API

  urlFotoPortada: string;

  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los publicaciones
  getPublicaciones(): Observable<DTOPublicacion[]> {
    return this.myHttp.get<DTOPublicacion[]>(this.url);
  }

  // Adiciona un publicacion
  addPublicacion(publicacion: any) {
    return this.myHttp.post(this.url, publicacion);
  }

  // Carga una publicacion para editarla
  showPublicacion(id: number): Observable<DTOPublicacion> {
    return this.myHttp.get<DTOPublicacion>(this.url + '/' + id);
  }

  // Actualiza un publicacion
  editPublicacion(id: number, publicacion: any) {
    return this.myHttp.put(this.url + '/' + id, publicacion);
  }

  // Adicionar un comentario
  adicionarComentario(comentario: any) {
    return this.myHttp.post(this.url + '/comentario', comentario);
  }

  // Actualiza un publicacion
  editarComentario(id: number, comentario: any) {
    return this.myHttp.put(this.url + '/comentario' + '/' + id, comentario);
  }

  // Elimina un publicacion
  deletePublicacion(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  uploadImagesPost(images: any) {
    return this.myHttp.post(this.urlUpload, images);
  }

  getColumnasTablaPublicaciones() {
    return [
      {
        // columnas del dataTable
        data: 'fecha',
        render: function (data) {
          const date = new Date(data);
          const month = date.getMonth() + 1;
          return date.getDate() + '/' + month + '/' + date.getFullYear();
        },
        className: 'text-center',
      },
      {
        data: function (row, type, set) {
          return (
            '<img style="object-fit: cover" width="100px" height="60px" src="' +
            urlFotosDestacadas +
            row.id +
            '/' +
            row.imagenDestacada +
            '">'
          );
        },
        // tslint:disable-next-line: quotemark
        className: "text-center",
      },
      {
        data: function (row, type, set) {
          return row.titulo + '<p style="font-size:12px"><strong>Comentarios: </strong>' + row.comentarios.length + '</p>';
        },
      },
      {
        data: 'categoria.nombre',
        className: 'text-center',
      },
      {
        data: 'estado.nombre',
        className: 'text-center',
      },
      {
        data: 'publicadaPor.nombre',
        className: 'text-center',
      }
    ];
  }
}
