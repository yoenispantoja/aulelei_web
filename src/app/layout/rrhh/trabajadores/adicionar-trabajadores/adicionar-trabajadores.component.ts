import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { TrabajadoresService } from 'src/app/shared/services/trabajadores.service';
import { routerTransition } from 'src/app/router.animations';
import { CodiguerasService } from 'src/app/shared/services/codigueras.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ServiciosService } from 'src/app/shared/services/servicios.service';

@Component({
  selector: 'app-adicionar-trabajadores',
  templateUrl: './adicionar-trabajadores.component.html',
  styleUrls: ['./adicionar-trabajadores.component.scss'],
  animations: [routerTransition()],
})
export class AdicionarTrabajadoresComponent implements OnInit {
  @ViewChild('confirmSwal', { static: true })
  private confirmSwal: SwalComponent;
  closeResult: string;
  categoriasServicios: any;

  listaServicios: number[] = [];

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private trabajadorService: TrabajadoresService,
    private servicioServicios: ServiciosService,
  ) {}

  ngOnInit() {
    this.fields = this.trabajadorService.camposAdicionarTrabajador();
    this.cargarServicios();
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      lista_servicios: this.listaServicios
    });
    this.trabajadorService.addTrabajador(datos).subscribe(
      (data) => {
        if (data) {
          this.confirmSwal.show();
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  cerrarVentana() {
    this.options.resetModel();
    this.form.reset();
  }

  cargarServicios() {
    this.servicioServicios.getCategoriasServicios().subscribe(datos => {
      this.categoriasServicios = datos['items'];
    });
  }

  seleccionarServicio(id: number, element: any) {
    // Si el checked es true, lo pongo en el arreglo
    if (element.target.checked) {
      this.listaServicios.push(id);
    } else {
      this.listaServicios = this.listaServicios.filter(servicio => servicio !== id);
    }
    // Ahora elimino los repetidos que puedan quedar luego del push
    this.listaServicios = this.listaServicios.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);

  }
}

