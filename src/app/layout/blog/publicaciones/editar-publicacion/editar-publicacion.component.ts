import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { Router, ActivatedRoute } from '@angular/router';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { routerTransition } from 'src/app/router.animations';
import { environment } from 'src/environments/environment';
import { KeyValueParam } from 'src/app/shared/models/key-value-param';
import { CodiguerasService } from 'src/app/shared/services/codigueras.service';

declare const tinymce: any;

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.scss'],
  animations: [routerTransition()],
})
export class EditarPublicacionComponent implements OnInit {
  urlFotosDestacadas = environment.apiMedias + 'publicaciones';

  @ViewChild('confirmSwal', { static: true }) private confirmSwal: SwalComponent;
  @ViewChild('notFoundSwal', { static: true }) private notFoundSwal: SwalComponent;


  @Input() src;
  closeResult: string;
  categorias: {};
  public form: FormGroup;

  idPublicacion: number;

  imgSrc = 'assets/images/upload_img.png';

  archivoImagen: any;

  // Codigueras
  categorias_publicacion: KeyValueParam[] = [];
  estados_publicacion: KeyValueParam[] = [];

  contadorLetrasDescripcion = 0;

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: PublicacionesService,
    private route: ActivatedRoute,
    private srvCodigueras: CodiguerasService,
    private router: Router
  ) {}

  ngOnInit() {
    // Recogiendo los datos enviados por la ruta
    this.idPublicacion = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.myServicio.showPublicacion(this.idPublicacion).subscribe((data) => {
      if (data['items']) {
      this.form.controls['fecha'].setValue(data['items'].fecha.slice(0, 10));
      this.form.controls['titulo'].setValue(data['items'].titulo);
      this.form.controls['categoria'].setValue(data['items'].categoria.id);
      this.form.controls['estado'].setValue(data['items'].estado.id);
      this.form.controls['body'].setValue(data['items'].body);
      this.form.controls['meta_descripcion'].setValue(
        data['items'].meta_descripcion
      );
      this.form.controls['palabras_clave'].setValue(
        data['items'].palabras_clave
      );
      this.imgSrc =
        this.urlFotosDestacadas +
        '/' +
        this.idPublicacion +
        '/' +
        data['items'].imagenDestacada;
      this.contarCaracteresDescripcion();
      } else {
        this.notFoundSwal.show();
      }
    });

    // Elementos del formulario
    this.form = this.formBuilder.group({
      fecha: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      body: ['', [Validators.required]],
      imagenDestacada: [''],
      meta_descripcion: [''],
      palabras_clave: [''],
    });

    // Cargando las codigueras de los combos

    this.srvCodigueras.getCategoriasPublicacion().subscribe((data) => {
      data['items'].map((element) => {
        this.categorias_publicacion.push({
          key: element.id,
          value: element.nombre,
        });
      });
    });

    this.srvCodigueras.getEstadosPublicacion().subscribe((data) => {
      data['items'].map((element) => {
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
        this.imgSrc = e.target['result'].toString();
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      this.archivoImagen = fileInput.target.files[0];
    }
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      publicadaPor: JSON.parse(localStorage.getItem('socialUser')).id,
    });

    const formData = new FormData();
    formData.append('datos', JSON.stringify(datos));
    formData.append('_method', 'PATCH');

    if (this.archivoImagen) {
      formData.append(
        'imagenDestacada',
        this.archivoImagen,
        'publicacion_temp.png'
      );
    }

    this.myServicio.editPublicacion(this.idPublicacion, formData).subscribe(
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
    // Enviando a la página de publicaciones
    this.router.navigate(['/admin/publicaciones']);
  }

  getInitData() {
    return {
      height: 400,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste imagetools wordcount',
      ],
      toolbar:
        // tslint:disable-next-line:max-line-length
        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
      // imagetools_ cors_hosts: ['www.tinymce.com', 'codepen.io'],
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        'assets/css/codepen.min.css',
      ],
      // enable title field in the Image dialog
      image_title: true,
      // enable automatic uploads of images represented by blob or data URIs
      automatic_uploads: true,
      // add custom filepicker only to Image dialog
      file_picker_types: 'image',

      images_upload_handler: (blobInfo, success, failure) => {
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        blobCache.add(blobInfo);

        // Convierto el Blog en File para enviarlo al servicio
        const imageFile = new File([blobInfo.blob()], blobInfo.blob().name, {
          type: blobInfo.blob().type,
        });

        // Lo preparo en el append
        const formData = new FormData();
        formData.append('imagenPost', imageFile, blobInfo.blob().name);
        this.myServicio.uploadImagesPost(formData).subscribe((data) => {
          success(
            environment.apiMedias + '/publicaciones/all/' + data['items']
          );
        });
      },
    };
  }

  contarCaracteresDescripcion() {
    let cadena: String;
    cadena = this.form.controls['meta_descripcion'].value;
    if (cadena) {
      this.contadorLetrasDescripcion = cadena.length;
    } else {
      this.contadorLetrasDescripcion = 0;
    }
  }
}
