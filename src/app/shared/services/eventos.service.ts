import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';

const urlFotosPortadaEventos = environment.apiMedias + 'eventos';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url = environment.apiUrl + '/evento'; // url del servicio del API


  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los eventos
  getEventos() {
    return this.myHttp.get(this.url);
  }

  // Adiciona un evento
  addEvento(evento: any) {
    return this.myHttp.post(this.url, evento);
  }

  // Carga los datos de un evento
  showEvento(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un evento
  editEvento(id: number, evento: any) {
    return this.myHttp.put(this.url + '/' + id, evento);
  }

  // Elimina un evento
  deleteEvento(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  // Configuración de las columnas de la tabla de eventos

  getColumnasTablaEventos() {
    return [
      {
        data: function(row, type, set) {
          return (
            '<img style="object-fit: cover" width="100px" height="60px" src="' +
            urlFotosPortadaEventos +
            '/' +
            row.id +
            '/' +
            row.foto +
            '">'
          );
        },
        // tslint:disable-next-line: quotemark
        className: "text-center"
      },
     {
       data: 'nombre',
       className: 'text-center'
     },
      {
       data: function(row, type, set) {
         if (row.descripcion.length > 40) {
           return row.descripcion.slice(0, 40) + '...';
         }
        return row.descripcion;
      },
       // className: 'text-center'
     },
     {
       data: 'fechaInicio',
       render: function(data) {
         const date = new Date(data);
         const month = date.getMonth() + 1;
         return (
           date.getDate() +
           '/' +
           month +
           '/' +
           date.getFullYear()
         );
       },
       className: 'text-center'
     },
     {
       data: 'fechaFin',
       render: function(data) {
         if (data != null) {
         const date = new Date(data);
         const month = date.getMonth() + 1;
         return (
           date.getDate() +
           '/' +
           month +
           '/' +
           date.getFullYear()
         ); } else { return '--'; }
       },
       className: 'text-center'
     },
     {
       data: 'lugar',
       className: 'text-center'
     }

   ];
  }

  camposAdicionarEventos(): FormlyFieldConfig[] {
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
              placeholder: 'Nombre del evento',
              required: true
            }
          },
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
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'input',
            key: 'lugar',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-map input-group-text'
              },
              label: 'Lugar',
              placeholder: 'Lugar',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'fechaInicio',
            templateOptions: {
              type: 'date',
              addonLeft: {
                class: 'text-primary fa fa-calendar'
              },
              label: 'Fecha de Inicio',
              placeholder: 'Fecha de Inicio',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'fechaFin',
            templateOptions: {
              type: 'date',
              addonLeft: {
                class: 'text-primary fa fa-calendar'
              },
              label: 'Fecha de Fin',
              placeholder: 'Fecha de Fin'

            }
          }
        ]
      }
    ];
  }

}
