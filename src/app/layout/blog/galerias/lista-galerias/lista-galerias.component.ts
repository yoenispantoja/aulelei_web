import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { GaleriasService } from 'src/app/shared/services/galerias.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VerGaleriaComponent } from '../ver-galeria/ver-galeria.component';

@Component({
  selector: 'app-lista-galerias',
  templateUrl: './lista-galerias.component.html',
  styleUrls: ['./lista-galerias.component.scss'],
  animations: [routerTransition()],
})
export class ListaGaleriasComponent implements OnInit {
  urlApi = environment.apiUrl + '/galeria'; // url del servicio del API

  @ViewChild('successSwal') private successSwal: SwalComponent;

  closeResult: string;

  // **** Parámetros del dataTable */
  nombresColumnas = [
    'Foto portada',
    'Nombre galería',
    'Descripción',
    'Categoría'
  ];

  columnasData: {};

  constructor(private myServicio: GaleriasService, private router: Router, private modalService: NgbModal, private ngZone: NgZone) {}

  ngOnInit() {
    // Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaGalerias();
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

  verDetallesGaleria(row: any) {
    // cargando en modal la página de la vista de la publicación
    const vistaGaleria = this.modalService.open(VerGaleriaComponent, {
      size: 'lg'
     });

    // le mando los datos
    vistaGaleria.componentInstance.galeria = row;

    vistaGaleria.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editarGaleria(row: any) {
    this.ngZone.run(() => this.router.navigate(['/admin/galerias/editar-galeria', row.id])).then();
  }

  eliminarGaleria(row: number) {
    this.myServicio.deleteGaleria(row).subscribe(
      (data) => {
        if (data) {
          this.successSwal.show();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
