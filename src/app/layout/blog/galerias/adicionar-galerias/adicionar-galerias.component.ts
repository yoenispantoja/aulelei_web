import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@toverux/ngx-sweetalert2"; // para los sweetAlerts
import { GaleriasService } from "src/app/shared/services/galerias.service";
import { routerTransition } from "src/app/router.animations";
import { CodiguerasService } from "src/app/shared/services/codigueras.service";
import { FormlyFormOptions } from '@ngx-formly/core';


@Component({
  selector: "app-adicionar-galerias",
  templateUrl: "./adicionar-galerias.component.html",
  styleUrls: ["./adicionar-galerias.component.scss"],
  animations: [routerTransition()],
})
export class AdicionarGaleriasComponent implements OnInit {
  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;

  @Input() src;
  closeResult: string;
  categorias: {};


  imgSrc = "assets/images/upload_img.png";

  archivosMostrar = [];
  archivosEnviar = [];
  filesGaleria: any[] = [];
  imagenPortada:any;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: GaleriasService,
    private codigueraService: CodiguerasService
  ) {}

  ngOnInit() {
    this.fields = this.myServicio.camposAdicionarGaleria();
    // Elementos del formulario
    this.form = this.formBuilder.group({
      imagenPortada: ["", [Validators.required]],
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      this.filesGaleria = event.target.files;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (evento: any) => {
          this.archivosMostrar.push(evento.target.result);
          this.archivosEnviar.push({
            contenido: evento.target.result,
            contentType: event.target.files[i].type,
            realName: event.target.files[i].name,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
    this.imagenPortada=fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target["result"].toString();
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
   const datos = Object.assign(this.form.value, {
      publicadaPor: JSON.parse(localStorage.getItem("socialUser")).id,
    });

    let formData = new FormData();
    formData.append("datos", JSON.stringify(datos));
    formData.append("imagenPortada", this.imagenPortada, "portadaGaleria.png");

    //adjunto file a file del multiple input
    Array.from(this.filesGaleria).forEach(file => {
      formData.append("imagenes", file, file.name);
    });


    this.myServicio.addGaleria(formData).subscribe(
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
    this.archivosMostrar = [];
    this.options.resetModel();
    this.form.reset();
    this.imgSrc = "assets/images/upload_img.png";
  }
}
