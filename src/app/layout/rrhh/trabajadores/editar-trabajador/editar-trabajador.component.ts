import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@toverux/ngx-sweetalert2"; // para los sweetAlerts
import { TrabajadoresService } from "src/app/shared/services/trabajadores.service";
import { FormlyFormOptions } from "@ngx-formly/core";
import { ServiciosService } from "src/app/shared/services/servicios.service";
import { routerTransition } from "src/app/router.animations";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-editar-trabajador",
  templateUrl: "./editar-trabajador.component.html",
  styleUrls: ["./editar-trabajador.component.scss"],
  animations: [routerTransition()],
})
export class EditarTrabajadorComponent implements OnInit {
  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;
  @ViewChild("notFoundSwal", { static: true })
  private notFoundSwal: SwalComponent;

  closeResult: string;
  categoriasServicios: any;

  listaServicios: number[] = [];
  listaServiciosMarcados: number[] = [];

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  idTrabajador: number;

  constructor(
    private formBuilder: FormBuilder,
    private trabajadorService: TrabajadoresService,
    private servicioServicios: ServiciosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idTrabajador = Number.parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.fields = this.trabajadorService.camposAdicionarTrabajador();
    this.cargarServicios();
    // Cargar datos del trabajador
    this.trabajadorService
      .showTrabajador(this.idTrabajador)
      .subscribe((data) => {
        if (data["items"]) {
          const {
            nombre_completo,
            usuario,
            ci,
            sexo,
            direccion,
            telefono,
            turno,
            active,
            servicios,
          } = data["items"];
          this.model = {
            ...this.model,
            nombre_completo,
            usuarioId: usuario.id,
            ci,
            sexo,
            direccion,
            telefono,
            rolId: usuario.rol.id,
            turnoServicioId: turno.id,
            active,
          };
          // Saco los id de los servicios para un arreglo
          servicios.map((servicio) => {
            this.listaServicios.push(servicio.id);
          });
        } else {
          this.notFoundSwal.show();
        }
      });
  }

  // Comprobar si el servicio está marcado para reflejado en su checkbox
  marcado(id: number) {
    return this.listaServicios.indexOf(id) > -1;
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      lista_servicios: this.listaServicios,
    });
    this.trabajadorService.editTrabajador(this.idTrabajador, datos).subscribe(
      (data) => {
        if (data) {
          this.confirmSwal.show();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cerrarVentana() {
    this.options.resetModel();
    this.form.reset();
    this.router.navigate(["/admin/trabajadores"]);
  }

  cargarServicios() {
    this.servicioServicios.getCategoriasServicios().subscribe((datos) => {
      this.categoriasServicios = datos["items"];
    });
  }

  seleccionarServicio(id: number, element: any) {
    // Si el checked es true, lo pongo en el arreglo
    if (element.target.checked) {
      this.listaServicios.push(id);
    } else {
      this.listaServicios = this.listaServicios.filter(
        (servicio) => servicio !== id
      );
    }
    // Ahora elimino los repetidos que puedan quedar luego del push
    this.listaServicios = this.listaServicios.filter(
      (valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
    );
  }
}
