import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const urlFotosServicios = environment.apiMedias + 'servicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url = environment.apiUrl + '/servicio'; // url del servicio del API
  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los servicios
  getServicios() {
    return this.myHttp.get(this.url);
  }

   // Devuelve la lista de los servicios
   getCategoriasServicios() {
    return this.myHttp.get(this.url + '/categorias');
  }

  // Devuelve la lista de los servicios de una categoria dada
  getServiciosCategoria(id: number) {
    return this.myHttp.get(this.url + '/categoria/' + id);
  }

  // Adiciona un servicio
  addServicio(servicio: any) {
    return this.myHttp.post(this.url, servicio);
  }

  // Carga los datos de un servicio
  showServicio(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un servicio
  editServicio(id: number, servicio: any) {
    return this.myHttp.put(this.url + '/' + id, servicio);
  }

  // Elimina un servicio
  deleteServicio(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  camposAdicionarServicio(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'input',
            key: 'nombre',
            templateOptions: {
              addonLeft: {
                text: 'N'
              },
              label: 'Nombre',
              placeholder: 'Nombre del servicio',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'categoria',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-filter'
              },
              label: 'Categoría',
              placeholder: 'Categoría',
              options: this.getCategorias(),
              valueProp: 'id',
              labelProp: 'nombre',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'precio',
            templateOptions: {
              addonLeft: {
                text: '$'
              },
              label: 'Precio',
              placeholder: 'Precio',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-8',
            type: 'input',
            key: 'descripcion',
            templateOptions: {
              addonLeft: {
                text: 'D'
              },
              label: 'Descripción',
              placeholder: 'Descripción',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'activo',
            templateOptions: {
              addonLeft: {
                text: 'A'
              },
              label: '¿Está activo?',
              placeholder: 'Seleccione',
              options: [
                {label: 'Activo', value: true},
                {label: 'Inactivo', value: false},
              ],
              required: true
            }
          }
        ]
      }
    ];
  }

    // Llenando el combo de las categorias
    getCategorias(): Observable<any[]> {
      return this.getCategoriasServicios().pipe(
        map(data => data['items'])
      );
    }

}


