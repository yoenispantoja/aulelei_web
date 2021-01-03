import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CodiguerasService } from "src/app/shared/services/codigueras.service";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';

let urlFotosPortadaGaleria = environment.apiMedias +'galerias';

@Injectable({
  providedIn: "root"
})
export class GaleriasService {
  url = environment.apiUrl + "/galeria"; // url del servicio del API

  constructor(
    private myHttp: HttpClient,
    private codigueraService: CodiguerasService
  ) {}

  // Devuelve la lista de los galerias
  getGalerias() {
    return this.myHttp.get(this.url);
  }

  // Adiciona un galeria
  addGaleria(galeria: any) {
    return this.myHttp.post(this.url, galeria);
  }

  // Actualiza un galeria
  showGaleria(id: number) {
    return this.myHttp.get(this.url + "/" + id);
  }

  // Actualiza un galeria
  editGaleria(id: number, galeria: any) {
    return this.myHttp.put(this.url + "/" + id, galeria);
  }

  deleteImagenGaleria(id:number){
    return this.myHttp.delete(this.url+ "/imagen"+"/" + id)
  }

  // Elimina un galeria
  deleteGaleria(id: number) {
    return this.myHttp.delete(this.url + "/" + id);
  }

  //Configuración de las columnas de la tabla de galerias

  getColumnasTablaGalerias() {
    return [
      {
        data: function(row, type, set) {
          return (
            '<img style="object-fit: cover" width="100px" height="60px" src="' +
            urlFotosPortadaGaleria +
            "/" +
            row.id +
            "/" +
            row.imagenPortada +
            '">'
          );
        },
        // tslint:disable-next-line: quotemark
        className: "text-center"
      },
      {
        data: "nombre",
        className: "text-center"
      },
      {
        data: "descripcion",
        className: "text-center"
      },
      {
        data: "categoria.nombre",
        className: "text-center"
      }
    ];
  }

  camposAdicionarGaleria(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: "col-6",
            type: "input",
            key: "nombre",
            templateOptions: {
              addonLeft: {
                text: "T"
              },
              label: "Nombre",
              placeholder: "Nombre de la galería",
              required: true
            }
          },
          {
            className: "col-6",
            type: "select",
            key: "categoria",
            templateOptions: {
              addonLeft: {
                class: "text-primary fa fa-filter"
              },
              label: "Categoría",
              placeholder: "Categoría",
              options: this.getCategoriasGalerias(),
              valueProp: "id",
              labelProp: "nombre",
              required:true
            }
          }
        ]
      },
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: "col-6",
            type: "input",
            key: "descripcion",
            templateOptions: {
              addonLeft: {
                class: "text-primary fa fa-list"
              },
              label: "Descripción",
              placeholder: "Descripción",
              required:true
            }
          },
          {
            className: "col-6",
            type: "select",
            key: "estado",
            templateOptions: {
              addonLeft: {
                class: "text-primary fa fa-filter"
              },
              label: "Estado",
              placeholder: "Estado",
              options: this.getEstadosGalerias(),
              valueProp: "id",
              labelProp: "nombre",
              required:true
            }
          }
        ]
      }
    ];
  }

  //Llenando el combo de las categorias
  getCategoriasGalerias(): Observable<any[]> {
    return this.codigueraService.getCategoriasGaleria().pipe(
      map(data => data['items'])
    );
  }

  //Llenando el combo de los estados
  getEstadosGalerias(): Observable<any[]> {
    return this.codigueraService.getEstadosGaleria().pipe(
      map(data=>data['items'])
    );
  }
}
