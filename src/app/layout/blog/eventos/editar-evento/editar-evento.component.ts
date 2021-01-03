import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@toverux/ngx-sweetalert2"; // para los sweetAlerts
import { EventosService } from "src/app/shared/services/eventos.service";
import { routerTransition } from "src/app/router.animations";
import { FormlyFormOptions } from "@ngx-formly/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-editar-evento",
  templateUrl: "./editar-evento.component.html",
  styleUrls: ["./editar-evento.component.scss"],
  animations: [routerTransition()],
})
export class EditarEventoComponent implements OnInit {
  urlFotosDestacada = environment.apiMedias + "eventos";

  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;
  @ViewChild("notFoundSwal", { static: true })
  private notFoundSwal: SwalComponent;

  @Input() src;
  closeResult: string;

  imgSrc = null;

  imagenPortada: any;

  idEvento: number;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: EventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fields = this.myServicio.camposAdicionarEventos();

    // Recogiendo los datos enviados por la ruta
    this.idEvento = Number.parseInt(this.route.snapshot.paramMap.get("id"));

    this.myServicio.showEvento(this.idEvento).subscribe((data) => {
      if (data["items"]) {
        const {
          nombre,
          descripcion,
          lugar,
          foto,
          fechaInicio,
          fechaFin,
        } = data["items"];

        this.model = {
          ...this.model,
          nombre,
          descripcion,
          lugar,
          fechaInicio: fechaInicio.slice(0, 10),
          fechaFin: fechaFin ? fechaFin.slice(0, 10) : null,
        };
        this.imgSrc = this.urlFotosDestacada + "/" + this.idEvento + "/" + foto;
      } else {
        this.notFoundSwal.show();
      }
    });
    // Elementos del formulario
    this.form = this.formBuilder.group({
      imagenPortada: ["", []],
    });
  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.imagenPortada = fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target["result"].toString();
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      publicadoPor: JSON.parse(localStorage.getItem("socialUser")).id,
    });

    const formData = new FormData();
    formData.append("datos", JSON.stringify(datos));
    if (this.imagenPortada) {
      formData.append("imagenPortada", this.imagenPortada, "portadaEvento.png");
    }

    this.myServicio.editEvento(this.idEvento, formData).subscribe(
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
    this.router.navigateByUrl("/admin/eventos");
  }
}
