import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const urlFotosUsuarios = environment.apiMedias + 'usuarios/';
const urlSinFoto = environment.apiMedias + 'assets/user.png';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = environment.apiUrl + '/user'; // url del servicio del API
  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los users
  getUsuarios() {
    return this.myHttp.get(this.url);
  }

  // Carga los datos de un user
  showUsuario(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un user
  editUsuario(id: number, user: any) {
    return this.myHttp.put(this.url + '/' + id, user);
  }

  getRoles() {
    return this.myHttp.get(this.url + '/roles');
  }

  // Elimina un user
  deleteUsuario(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  // Configuración de las columnas de la tabla de eventos

  getColumnasTablaClientes() {
    return [
      {
        data: function (row, type, set) {
          if (row.img === 'default.png') {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              urlSinFoto +
              '">'
            );
          } else if (row.img.indexOf('https') >= 0) {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              row.img +
              '">'
            );
          } else {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              urlFotosUsuarios +
              row.id +
              '/' +
              row.img +
              '">'
            );
          }
        },
        // tslint:disable-next-line: quotemark
        className: "text-center",
      },
      {
        data: 'nombre',
        className: 'text-center',
      },
      {
        data: 'email',
        className: 'text-center',
      },
      {
        data: 'created_at',
        render: function (data) {
          const date = new Date(data);
          const month = date.getMonth() + 1;
          return date.getDate() + '/' + month + '/' + date.getFullYear();
        },
        className: 'text-center',
      },
      {
        data: function (row, type, set) {
          if (row.google) {
            return 'Sí';
          } else {
            return 'No';
          }
        },
        className: 'text-center',
      },
    ];
  }

  camposAdicionarUsuario(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6 text-primary',
            type: 'input',
            key: 'nombre',
            templateOptions: {
              addonLeft: {
                text: 'N',
              },
              label: 'Nombre',
              placeholder: 'Nombre del usuario',
              required: true,
            },
          },
          {
            className: 'col-6 text-primary',
            type: 'input',
            key: 'email',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-envelope',
              },
              label: 'Correo electrónico',
              placeholder: 'Correo electrónico',
              required: true,
            },
          }
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6 text-primary',
            type: 'select',
            key: 'rolId',
            templateOptions: {
              type: 'input',
              addonLeft: {
                text: 'R'
              },
              label: 'Rol',
              options: this.llenarComboRol(),
              valueProp: 'id',
              labelProp: 'nombre',
              required: true
            }
          },
          {
            className: 'col-6 text-primary',
            type: 'select',
            key: 'active',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-filter',
              },
              label: 'Activo',
              options: [
                {label: 'Activo', value: true},
                {label: 'Inactivo', value: false},
              ],
              required: true,
            },
          },

        ],
      },
    ];
  }

  // Tabla de usuarios
  getColumnasTablaUsuarios() {
    return [
      {
        data: function (row, type, set) {
          if (row.img === 'default.png') {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              urlSinFoto +
              '">'
            );
          } else if (row.img.indexOf('https') >= 0) {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              row.img +
              '">'
            );
          } else {
            return (
              '<img style="object-fit: cover; border-radius:50%" width="60px" height="60px" src="' +
              urlFotosUsuarios +
              row.id +
              '/' +
              row.img +
              '">'
            );
          }
        },
        // tslint:disable-next-line: quotemark
        className: "text-center",
      },
      {
        data: 'nombre',
        className: 'text-center',
      },
      {
        data: 'email',
        className: 'text-center',
      },

      {
        data: function (row, type, set) {
          if (row.google) {
            return 'Sí';
          } else {
            return 'No';
          }
        },
        className: 'text-center',
      },
      {
        data: function (row, type, set) {
          if (row.active) {
            return 'Sí';
          } else {
            return 'No';
          }
        },
        className: 'text-center',
      },
      {
        data: 'rol.nombre',
        className: 'text-center',
      },
    ];
  }

    // Llenando el combo de los turnos de servicio
    llenarComboRol(): Observable<any[]> {
      return this.getRoles().pipe(
        map(data => data['items'].filter(rol => rol.id !== 1))
      );
    }

}
