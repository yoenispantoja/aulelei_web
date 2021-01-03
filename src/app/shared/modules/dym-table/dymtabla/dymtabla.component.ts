import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { TableFactoryService } from '../services/table-factory.service';

@Component({
  selector: 'dymtabla',
  templateUrl: './dymtabla.component.html',
  styleUrls: ['./dymtabla.component.scss']
})
export class DymtablaComponent implements OnInit {

  @ViewChild('questionSwal') private questionSwal: SwalComponent;

  dtOptions: {}; // opciones para el dataTable
  dtTrigger: any = new Subject();

  _puedeVerDetalles = true;
  _puedeEditar = true;
  _puedeEliminar = true;

  @Input() nombresColumnas: string[];
  @Input() urlApi: string;
  @Input() tituloReporte: string;
  @Input() columnasData: any[];

  @Input('puedeVerDetalles') set puedeVerDetalles(value: boolean) {
    this._puedeVerDetalles = value;
  }
  get puedeVerDetalles(): boolean {
    return this._puedeVerDetalles;
  }

  @Input('puedeEditar') set puedeEditar(value: boolean) {
    this._puedeEditar = value;
  }
  get puedeEditar(): boolean {
    return this._puedeEditar;
  }

  @Input('puedeEliminar') set puedeEliminar(value: boolean) {
    this._puedeEliminar = value;
  }
  get puedeEliminar(): boolean {
    return this._puedeEliminar;
  }


  // Eventos realizados sobre la tabla

  @Output() verDetallesClick: EventEmitter<any> = new EventEmitter();
  @Output() editarClick: EventEmitter<any> = new EventEmitter();
  @Output() eliminarClick: EventEmitter<any> = new EventEmitter();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  row: any; // para la fila seleccionada

  showButton = '<button type=\'button\' id=\'btnDetalles\' class=\'btn btn-sm btn-info btn-detail\' title=\'Ver detalles\'><i class=\'fa fa-search-plus vermas\'></i></button>';
  editButton = ' <button type=\'button\' id=\'btnEditar\' (click)=\'open(content)\' class=\'btn btn-sm btn-warning btn-detail\' title=\'Editar\'><i class=\'fa fa-edit vermas\'></i></button>';
  deleteButton = ' <button type=\'button\' id=\'btnEliminar\' class=\'btn btn-sm btn-danger btn-detail\' title=\'Eliminar\'><i class=\'fa fa-trash vermas\'></i></button>';

  // **** Parámetros del dataTable */
  columnaAcciones = [];

  columnas: any[] = [];


  // columnas= this.columnasData;

  orientacion = 'Portrait'; // orientación de la página del documento que se exportará
  closeResult: string;


  constructor(private myTabla: TableFactoryService) { }

  ngOnInit() {
    this.mostrarBotones();
    this.columnas = this.columnasData.concat(this.columnaAcciones);

    // Preparando las opciones
    this.dtOptions = this.myTabla.getDataTable(
      this.urlApi,
      this.columnas,
      this.tituloReporte,
      this.orientacion
    );


   // ****************************************************************** */
   /**** Este bloque es en caso de que la columna sea de imágenes ***** */
   /******************************************************************** */

   // Evento click de la foto pequeña
   $(document).on('click', '.person-photo', $event => {
    const row = this.myTabla.getRowSelected();
    // cerrando todas las abiertas
    const divs = document.getElementsByClassName('photo-hidden');
    for (let i = 0; i < divs.length; i++) {
      divs[i].setAttribute('style', 'display = \'none\'');
    }
    document.getElementById('hidden_' + row.id).style.display = 'block';
  });

  // Evento click de la foto grande
  $(document).on('click', '.photo-hidden', $event => {
    const row = this.myTabla.getRowSelected();
    document.getElementById('hidden_' + row.id).style.display = 'none';
  });

  /***********************************************************************/
  /***********************************************************************/

   // Evento click del botón Ver detalles
   $(document).on('click', '#btnDetalles', $event => {
    const row = this.myTabla.getRowSelected();
    // Redireccionando a la página de edición de publicaciones
    this.verDetallesClick.emit(row);
  });

  // Evento click del botón Editar
  $(document).on('click', '#btnEditar', $event => {
    const row = this.myTabla.getRowSelected();
    // Redireccionando a la página de edición de publicaciones
    this.editarClick.emit(row);
  });

  // Evento click del botón Eliminar
  $(document).on('click', '#btnEliminar', $event => {
    this.questionSwal.show();
  });

}

  mostrarBotones() {
    // armando los botones según los inputs
    let defaultContent = '';
    if (this._puedeVerDetalles) {
      defaultContent += this.showButton;
    }
    if (this._puedeEditar) {
      defaultContent += this.editButton;
    }
    if (this._puedeEliminar) {
      defaultContent += this.deleteButton;
    }

    this.columnaAcciones.push({ defaultContent });
  }

eliminarRegistro(): void {
  const row = this.myTabla.getRowSelected();
  this.eliminarClick.emit(row.id);
  this.rerender();
}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}

}
