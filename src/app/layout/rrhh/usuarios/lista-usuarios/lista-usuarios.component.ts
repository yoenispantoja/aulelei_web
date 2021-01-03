import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  animations: [routerTransition()],
})
export class ListaUsuariosComponent implements OnInit {
  urlApi = environment.apiUrl + '/user'; // url del servicio del API

  @ViewChild('successSwal') private successSwal: SwalComponent;

  // **** Parámetros del dataTable */
  nombresColumnas = [
    'Foto',
    'Nombre',
    'Email',
    'Red social',
    'Activo',
    'Rol'
  ];

  closeResult: string;

  columnasData: {};

  constructor(private myServicio: UsuariosService, private ngZone: NgZone, private router: Router,  private modalService: NgbModal) {}

  ngOnInit() {
    // Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaUsuarios();
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

   verDetallesUsuario(row: any) {
  //   // cargando en modal la página de la vista de la publicación
  //   const vistaUsuario = this.modalService.open(VerUsuarioComponent, {
  //     size: 'lg'
  //    });

  //   // le mando los datos
  //   vistaUsuario.componentInstance.usuario = row;

  //   vistaUsuario.result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
   }

  editarUsuario(row: any) {
    this.ngZone.run(() => this.router.navigate(['/admin/usuarios/editar-usuario', row.id])).then();
  }

  eliminarUsuario(row: number) {
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

