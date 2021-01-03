import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { EventosService } from 'src/app/shared/services/eventos.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VerEventoComponent } from '../ver-evento/ver-evento.component';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss'],
  animations: [routerTransition()],
})
export class ListaEventosComponent implements OnInit {
  urlApi = environment.apiUrl + '/evento'; // url del servicio del API

  @ViewChild('successSwal') private successSwal: SwalComponent;

  // **** Parámetros del dataTable */
  nombresColumnas = [
    'Foto',
    'Nombre evento',
    'Descripción',
    'Fecha Inicio',
    'Fecha Fin',
    'Lugar',
  ];

  closeResult: string;

  columnasData: {};

  constructor(private myServicio: EventosService, private router: Router,  private modalService: NgbModal, private ngZone: NgZone) {}

  ngOnInit() {
    // Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaEventos();
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

  verDetallesEvento(row: any) {
    // cargando en modal la página de la vista de la publicación
    const vistaEvento = this.modalService.open(VerEventoComponent, {
      size: 'lg'
     });

    // le mando los datos
    vistaEvento.componentInstance.evento = row;

    vistaEvento.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editarEvento(row: any) {
    this.ngZone.run(() => this.router.navigate(['/admin/eventos/editar-evento', row.id])).then();
  }

  eliminarEvento(row: number) {
    this.myServicio.deleteEvento(row).subscribe(
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
