import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@toverux/ngx-sweetalert2"; // para los sweetAlerts
import { PublicacionesService } from "src/app/shared/services/publicaciones.service";
import { routerTransition } from "src/app/router.animations";
import { environment } from "src/environments/environment";
import { KeyValueParam } from "src/app/shared/models/key-value-param";
import { CodiguerasService } from "src/app/shared/services/codigueras.service";

declare const tinymce: any;

@Component({
  selector: "app-adicionar-publicaciones",
  templateUrl: "./adicionar-publicaciones.component.html",
  styleUrls: ["./adicionar-publicaciones.component.scss"],
  animations: [routerTransition()],
})
export class AdicionarPublicacionesComponent implements OnInit {
  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;

  @Input() src;
  closeResult: string;
  categorias: {};
  public form: FormGroup;

  //Codigueras
  categorias_publicacion: KeyValueParam[] = [];
  estados_publicacion: KeyValueParam[] = [];

  imgSrc = "assets/images/upload_img.png";

  archivoImagen: any;

  contadorLetrasDescripcion=0;

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: PublicacionesService,
    private srvCodigueras: CodiguerasService
  ) {}

  ngOnInit() {
    // Elementos del formulario
    this.form = this.formBuilder.group({
      fecha: ["", [Validators.required]],
      titulo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      body: ["", [Validators.required]],
      imagenDestacada: ["", [Validators.required]],
      metaDescripcion: [""],
      palabrasClave: [""],
    });

    //Cargando las codigueras de los combos

    this.srvCodigueras.getCategoriasPublicacion().subscribe((data) => {
      data["items"].map((element) => {
        this.categorias_publicacion.push({
          key: element.id,
          value: element.nombre,
        });
      });
    });

    this.srvCodigueras.getEstadosPublicacion().subscribe((data) => {
      data["items"].map((element) => {
        this.estados_publicacion.push({
          key: element.id,
          value: element.nombre,
        });
      });
    });
  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imgSrc = e.target["result"].toString();
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      this.archivoImagen = fileInput.target.files[0];
    }
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      publicadaPor: JSON.parse(localStorage.getItem("socialUser")).id,
    });

    let formData = new FormData();
    formData.append("datos", JSON.stringify(datos));
    formData.append("imagenDestacada", this.archivoImagen, "pachi.png");

    this.myServicio.addPublicacion(formData).subscribe(
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
    this.form.reset();
    this.contadorLetrasDescripcion=0;
    this.imgSrc = "assets/images/upload_img.png";
  }

  getInitData() {
    return {
      height: 400,
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools wordcount",
      ],
      toolbar:
        // tslint:disable-next-line:max-line-length
        "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
      // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      content_css: [
        "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
        "assets/css/codepen.min.css",
      ],

      // enable title field in the Image dialog
      image_title: true,
      // enable automatic uploads of images represented by blob or data URIs
      automatic_uploads: true,
      // add custom filepicker only to Image dialog
      file_picker_types: "image",

      images_upload_handler: (blobInfo, success, failure) => {
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        blobCache.add(blobInfo);

        //Convierto el Blog en File para enviarlo al servicio
        const imageFile = new File([blobInfo.blob()], blobInfo.blob().name, { type: blobInfo.blob().type });

        //Lo preparo en el append
        let formData = new FormData();
        formData.append("imagenPost", imageFile, blobInfo.blob().name);
        this.myServicio.uploadImagesPost(formData).subscribe(data => {
          success(environment.apiMedias + "/publicaciones/all/" + data["items"]);
         });
      },
    };
  }

  contarCaracteresDescripcion() {
    let cadena:String;
    cadena= this.form.controls["metaDescripcion"].value;
    this.contadorLetrasDescripcion = cadena.length;
  }
}
