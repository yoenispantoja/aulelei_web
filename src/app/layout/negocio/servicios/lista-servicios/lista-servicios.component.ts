import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ServiciosService } from '../../../../shared/services/servicios.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss'],
  animations: [routerTransition()],
})
export class ListaServiciosComponent implements OnInit {
  categoriasServicios: any;

  @ViewChild('successSwal') private successSwal: SwalComponent;

  constructor(
    private servicioServicios: ServiciosService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // cargando lista de categorías
    this.cargarServicios();
  }

  eliminarServicio(id: number) {
    this.servicioServicios.deleteServicio(id).subscribe(
      (data) => {
        if (data) {
          this.successSwal.show();
          this.cargarServicios();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarServicio(id: number) {
    this.ngZone.run(() => this.router.navigate(['/admin/servicios/editar-servicio', id])).then();
  }

  cargarServicios() {
    this.servicioServicios.getCategoriasServicios().subscribe((datos) => {
      this.categoriasServicios = datos['items'];
    });
  }
}
