import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
  animations: [routerTransition()],
})
export class ListaClientesComponent implements OnInit {
  urlApi = environment.apiUrl + '/user/rol/6'; // url del servicio del API

  @ViewChild('successSwal') private successSwal: SwalComponent;

  // **** Parámetros del dataTable */
  nombresColumnas = [
    'Foto',
    'Nombre',
    'Email',
    'Fecha registrado',
    'Red social'
  ];

  closeResult: string;

  columnasData: {};

  constructor(private myServicio: UsuariosService, private ngZone: NgZone, private router: Router,  private modalService: NgbModal) {}

  ngOnInit() {
    // Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaClientes();
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

   verDetallesCliente(row: any) {
  //   // cargando en modal la página de la vista de la publicación
  //   const vistaCliente = this.modalService.open(VerClienteComponent, {
  //     size: 'lg'
  //    });

  //   // le mando los datos
  //   vistaCliente.componentInstance.cliente = row;

  //   vistaCliente.result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
   }

  editarCliente(row: any) {
    this.ngZone.run(() => this.router.navigate(['/admin/clientes/editar-cliente', row.id])).then();
  }

  eliminarCliente(row: number) {
    this.myServicio.deleteUsuario(row).subscribe(
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

