import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VerPublicacionComponent } from '../ver-publicacion/ver-publicacion.component';


@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
  animations: [routerTransition()]
})
export class ListaPublicacionesComponent implements OnInit {

  urlApi = environment.apiUrl + '/publicacion'; // url del servicio del API

  @ViewChild('successSwal') private successSwal: SwalComponent;

  // **** Parámetros del dataTable */
  nombresColumnas = ['Fecha', 'Portada', 'Título', 'Categoría', 'Estado', 'Autor'];
  columnasData: {};
  closeResult: string;

  constructor(
    private myServicio: PublicacionesService,
    private router: Router,
    private modalService: NgbModal,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaPublicaciones();

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  verDetallesPublicacion(row: any) {
    // cargando en modal la página de la vista de la publicación
    const vistaPublicacion = this.modalService.open(VerPublicacionComponent, {
      size: 'lg'
     });

    // le mando los datos
    vistaPublicacion.componentInstance.publicacion = row;

    vistaPublicacion.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  // Editar publicación
  editarPublicacion(row: any) {
    this.ngZone.run(() => this.router.navigate(['/admin/publicaciones/editar-publicacion', row.id])).then();
  }

  // Eliminar publicación
  eliminarPublicacion(row: number) {
    this.myServicio.deletePublicacion(row).subscribe(
      data => {
        if (data) {
          this.successSwal.show();
        }
      },
      error => {
        console.log(error);
      }
    );
  }



}
