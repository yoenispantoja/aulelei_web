import { Injectable } from '@angular/core';

const token = 'Bearer ' + localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class TableFactoryService {

  // Atributo de la DataTable
  dtOptions: any = {};

  // Fila seleccionada
  rowSelected: any;

  // Internacionalizando el datatable
  idioma_es = {
    'search': 'Buscar en la tabla:',
    'processing': '<img src=\'./assets/img/spinner.gif\'>',
    'lengthMenu': 'Mostrando _MENU_ registros por p&aacute;gina',
    'zeroRecords': 'No se encontraron resultados',
    'info': 'Mostrando _PAGE_ de _PAGES_',
    'infoEmpty': 'No hay registros',
    'infoFiltered': '(Filtrado de _MAX_ resultados)',
    'paginate': {
      'first': 'Primero',
      'previous': 'Anterior',
      'next': 'Siguiente',
      'last': '&Uacute;ltimo'
    }
  };


  constructor( ) {

  }

  getDataTable(url, columnas, titulo, orientacion) {

     this.dtOptions = {
      pagingType: 'full_numbers',
      columns: columnas,
      ajax: {
        url: url,
        dataSrc: 'items',
        method: 'GET',
        async: true,
        // Pasando el token de seguridad
        headers: { 'Authorization': token },
        error: function(response) {
          switch (response.status) {
            case 401:
               console.log('Acceso no autorizado a los datos');
               break;
            case 500:
              // console.log(response.statusText);
              console.log('Atención!', response.statusText);
         }
        }
      },
      responsive: true,
      // order: true,
      // serverSide: true,
      // processing: true,
      language: this.idioma_es,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'Todos']
      ],
      // botones extras
      dom: 'Bfrtip',
      buttons: [
        // Preparación del botón de Exportar PDF
        {
          extend: 'pdf',
          filename: titulo,
          orientation: orientacion,
          text: '<span title="Exportar a PDF"><i class="fa fa-file-pdf-o"></i> PDF</span>',
          messageTop: {
            text: [{
              text: '\n \n' + titulo,
              bold: true,
              fontSize: 16,
              alignment: 'center',
              color: '#008d4c',
            }]
          },
          className: 'btn btn-success btn-xs pull-right btn-space',
          exportOptions: {
            alignment: 'center',
            modifier: {
              // page: 'current'  //Aqui se le puede especificar cuál(es) página(s) se imprimen
            },
            columns: 'thead th:not(.thOperations)'
          },

          customize: function (doc) {

            doc.content.splice(0, 1, {}, {
              text: [{
                text: 'Sistema de Gestión Integral - DORIAN',
                bold: true,
                fontSize: 12,
                alignment: 'center'
              }]
            }),
              doc.styles['tableHeader'] = {
                bold: true,
                fontSize: 11,
                color: 'white',
                fillColor: '#008d4c',
                alignment: 'center'

              };

            // Seteando la fuente del documento exportado
            doc.defaultStyle.fontSize = 8;
            // Seteando la fuente de la cabecera de la tabla
            doc.styles.tableHeader.fontSize = 10;

            // Cambiando el layout de la tabla generada (Table styling)

            // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
            const objLayout = {};
            objLayout['hLineWidth'] = function (i) { return .5; };
            objLayout['vLineWidth'] = function (i) { return .5; };
            objLayout['hLineColor'] = function (i) { return '#aaa'; };
            objLayout['vLineColor'] = function (i) { return '#aaa'; };
            objLayout['paddingLeft'] = function (i) { return 4; };
            objLayout['paddingRight'] = function (i) { return 4; };
            doc.content[3].layout = objLayout;
            doc.content[3].widths = ['*', 'auto', 100, '*'];

            // Creando un rodapié con dos columnas
            // Left side: fecha del reporte
            // Right side: página actual y total
            doc['footer'] = (function (page, pages) {
              return {
                columns: [{
                  alignment: 'left',
                  text: ['Fecha de creado: ', { text: new Date().toLocaleDateString() }]
                },
                {
                  alignment: 'right',
                  text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                }
                ],
                margin: 20
              };
            });

          }

        },
        // Configuración del botón de Exportar a Excel
        {
          extend: 'excel',
          text: '<span title="Exportar a Excel"><i class="fa fa-file-excel-o"></i> Excel</span>',
          title: titulo,
          filename: titulo,
          className: 'btn btn-success btn-xs pull-right btn-space',
          exportOptions: {
            alignment: 'center'
          },
        },
        // Configuración del botón de Copiar al portapapeles
        {
          extend: 'copy',
          text: '<span title="Copiar"><i class="fa fa-copy"></i> Copiar</span>',
          className: 'btn btn-success btn-xs pull-right btn-space'
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {

        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.rowSelected = data;
        });
      }
    };
    return this.dtOptions;
  }

  // Devuelve la fila seleccionada
  getRowSelected() {
    return this.rowSelected;
  }

}
