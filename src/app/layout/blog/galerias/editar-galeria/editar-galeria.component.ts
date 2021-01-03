import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@toverux/ngx-sweetalert2"; // para los sweetAlerts
import { GaleriasService } from "src/app/shared/services/galerias.service";
import { routerTransition } from "src/app/router.animations";
import { CodiguerasService } from "src/app/shared/services/codigueras.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-editar-galerias",
  templateUrl: "./editar-galeria.component.html",
  styleUrls: ["./editar-galeria.component.scss"],
  animations: [routerTransition()],
})
export class EditarGaleriasComponent implements OnInit {
  urlGaleria = environment.apiMedias + "/galerias/";

  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;
  @ViewChild("notFoundSwal", { static: true })
  private notFoundSwal: SwalComponent;

  @Input() src;
  closeResult: string;
  categorias: {};

  idGaleria: number;

  imgSrc = "assets/images/upload_img.png";

  archivosMostrar = [];
  idsImagenesEliminar = [];
  filesGaleria: any[] = [];
  imagenPortada: any;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: GaleriasService,
    private codigueraService: CodiguerasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Recogiendo los datos enviados por la ruta
    this.idGaleria = Number.parseInt(this.route.snapshot.paramMap.get("id"));

    this.myServicio.showGaleria(this.idGaleria).subscribe((data) => {
      // Lleno los datos del formly
      this.fields = this.myServicio.camposAdicionarGaleria();

      if (data["items"]) {
        // Llenando los campos desde el servicio
        this.model = {
          ...this.model,
          nombre: data["items"].nombre,
          descripcion: data["items"].descripcion,
          categoria: data["items"].categoria.id,
          estado: data["items"].estado.id,
        };

        this.imgSrc =
          this.urlGaleria + this.idGaleria + "/" + data["items"].imagenPortada;
        // Cargando el resto de las imágenes
        data["items"].imagenes.map((imagen) => {
          this.archivosMostrar.push({
            src: this.urlGaleria + this.idGaleria + "/" + imagen.nombreImagen,
            id: imagen.id,
            tipo: 0, // esto me sirve para decir que es una imagen ya subida
          });
        });
      } else {
        this.notFoundSwal.show();
      }
    });

    this.form = this.formBuilder.group({
      imagenPortada: [""],
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      this.filesGaleria = event.target.files;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (evento: any) => {
          this.archivosMostrar.push({
            src: evento.target.result,
            id: Math.random().toString(36).substring(10),
            tipo: 1,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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
    const datos = Object.assign(this.form.value, this.model, {
      publicadaPor: JSON.parse(localStorage.getItem("socialUser")).id,
    });

    let formData = new FormData();
    formData.append("datos", JSON.stringify(datos));

    if (this.imagenPortada) {
      formData.append(
        "imagenPortada",
        this.imagenPortada,
        "imagenPortadaGaleria.png"
      );
    }

    // adjunto file a file del multiple input
    Array.from(this.filesGaleria).forEach((file) => {
      formData.append("imagenes", file, file.name);
    });

    // Eliminando las imágenes de la bd
    this.idsImagenesEliminar.map((id) => {
      this.myServicio.deleteImagenGaleria(id).subscribe();
    });

    this.myServicio.editGaleria(this.idGaleria, formData).subscribe(
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
    // Enviando a la página de galerias
    this.router.navigate(["/admin/galerias"]);
  }

  eliminarImagen(id: any, tipo: number) {
    // Eliminando del arreglo this.archivosMostrar
    this.archivosMostrar = this.archivosMostrar.filter(
      (foto) => foto.id !== id
    );
    // Para las que están guardadas en BD hay que hacerlo en el submit
    // Voy guardando los ids
    if (tipo === 0) {
      this.idsImagenesEliminar.push(id);
    }
  }
}
