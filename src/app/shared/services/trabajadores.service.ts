import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { map, filter } from 'rxjs/operators';

const urlFotosTrabajadores = environment.apiMedias + 'trabajadores';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  url = environment.apiUrl + '/trabajador'; // url del servicio del API
  constructor(private myHttp: HttpClient, private usuariosService: UsuariosService) {}

  // Devuelve la lista de los trabajadores
  getTrabajadores() {
    return this.myHttp.get(this.url);
  }


  // Devuelve la lista de los trabajadores
  getTurnosServicio() {
    return this.myHttp.get(this.url + '/turnos_servicio');
  }

  // Adiciona un trabajador
  addTrabajador(trabajador: any) {
    return this.myHttp.post(this.url, trabajador);
  }

  // Carga los datos de un trabajador
  showTrabajador(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un trabajador
  editTrabajador(id: number, trabajador: any) {
    return this.myHttp.put(this.url + '/' + id, trabajador);
  }

  // Elimina un trabajador
  deleteTrabajador(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  camposAdicionarTrabajador(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row text-primary',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'input',
            key: 'nombre_completo',
            templateOptions: {
              addonLeft: {
                text: 'N'
              },
              label: 'Nombre',
              placeholder: 'Nombre del trabajador',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'usuarioId',
            templateOptions: {
                addonLeft: {
                class: 'text-primary fa fa-user'
              },
              label: 'Usuario',
              placeholder: 'Seleccione',
              options: this.getUsuarios(),
              valueProp: 'id',
              labelProp: 'email',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'ci',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-credit-card'
              },
              label: 'Carné de Identidad',
              placeholder: 'Carné de identidad',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row text-primary',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'select',
            key: 'sexo',
            templateOptions: {
              addonLeft: {
                text: 'S'
              },
              label: 'Sexo',
              placeholder: 'Seleccione',
              options: [
                {label: 'Masculino', value: 'm'},
                {label: 'Femenino', value: 'f'},
              ],
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'direccion',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-map'
              },
              label: 'Dirección',
              placeholder: 'Dirección',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'telefono',
            templateOptions: {
              type: 'input',
              addonLeft: {
                class: 'text-primary fa fa-phone'
              },
              label: 'Teléfono',
              placeholder: 'Teléfono',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row text-primary',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'select',
            key: 'rolId',
            templateOptions: {
              type: 'input',
              addonLeft: {
                text: 'R'
              },
              label: 'Rol',
              placeholder: 'Seleccione',
              options: this.llenarComboRol(),
              valueProp: 'id',
              labelProp: 'nombre',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'turnoServicioId',
            templateOptions: {
                addonLeft: {
                class: 'text-primary fa fa-clock'
              },
              label: 'Turno de Servicio',
              placeholder: 'Seleccione',
              options: this.llenarComboTurnosServicio(),
              valueProp: 'id',
              labelProp: 'nombre',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'active',
            templateOptions: {
                addonLeft: {
                class: 'text-primary fa fa-check'
              },
              label: '¿Está activo?',
              placeholder: 'Seleccione',
              options: [
                {label: 'Activo', value: 1},
                {label: 'Inactivo', value: 0},
              ],
              required: true
            }
          }
        ]
      }
    ];
  }

   // Llenando el combo de las categorias
   getUsuarios(): Observable<any[]> {
    return this.usuariosService.getUsuarios().pipe(
      map(data => data['items'])
    );
  }

   // Llenando el combo de los turnos de servicio
   llenarComboTurnosServicio(): Observable<any[]> {
    return this.getTurnosServicio().pipe(
      map(data => data['items'])
    );
  }

  // Llenando el combo de los turnos de servicio
  llenarComboRol(): Observable<any[]> {
    return this.usuariosService.getRoles().pipe(
      map(data => data['items'].filter(rol => rol.id !== 1 && rol.id !== 6))
    );
  }

}
