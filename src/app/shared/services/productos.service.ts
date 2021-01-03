import { DTOProducto } from './../models/DTOProducto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const urlFotosProductos = environment.apiMedias + 'productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = environment.apiUrl + '/producto'; // url del producto del API
  constructor(private myHttp: HttpClient) {}

  // Devuelve la lista de los productos
  getProductos(): Observable<DTOProducto[]> {
    return this.myHttp.get<DTOProducto[]>(this.url);
  }

   // Devuelve la lista de los productos
   getCategoriasProductos() {
    return this.myHttp.get(this.url + '/categorias');
  }

  // Adiciona un producto
  addProducto(producto: any) {
    return this.myHttp.post(this.url, producto);
  }

  // Carga los datos de un producto
  showProducto(id: number) {
    return this.myHttp.get(this.url + '/' + id);
  }
  // Actualiza un producto
  editProducto(id: number, producto: any) {
    return this.myHttp.put(this.url + '/' + id, producto);
  }

  // Elimina un producto
  deleteProducto(id: number) {
    return this.myHttp.delete(this.url + '/' + id);
  }

  camposAdicionarProducto(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'input',
            key: 'codigo',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-barcode'
              },
              label: 'Código',
              placeholder: 'Código del producto',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'nombre',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-gift'
              },
              label: 'Nombre',
              placeholder: 'Nombre del producto',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'categoria',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-star'
              },
              label: 'Categoría',
              placeholder: 'Seleccione',
              options: this.getCategorias(),
              valueProp: 'id',
              labelProp: 'nombre',
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
            key: 'precio',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-usd'
              },
              label: 'Precio',
              placeholder: 'Precio',
              required: true
            }
          },
          {
            className: 'col-8',
            type: 'input',
            key: 'descripcion',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-info'
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
            key: 'um',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-tachometer'
              },
              label: 'U/M',
              placeholder: 'Unidad de medida',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'cantidad_stock',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-server'
              },
              label: 'Cantidad stock',
              placeholder: 'Cantidad en stock',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'select',
            key: 'disponible',
            templateOptions: {
              addonLeft: {
                class: 'text-primary fa fa-check'
              },
              label: 'Disponible',
              placeholder: 'Seleccione',
              options: [
                {label: 'Sí', value: true},
                {label: 'No', value: false},
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
      return this.getCategoriasProductos().pipe(
        map(data => data['items'])
      );
    }

}


