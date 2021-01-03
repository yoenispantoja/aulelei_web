import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { ServiciosService } from 'src/app/shared/services/servicios.service';
import { routerTransition } from 'src/app/router.animations';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.scss'],
  animations: [routerTransition()],
})
export class EditarServicioComponent implements OnInit {
  avatarServicio = environment.apiMedias + 'servicios';

  @ViewChild('confirmSwal', { static: true }) private confirmSwal: SwalComponent;
  @ViewChild('notFoundSwal', { static: true }) private notFoundSwal: SwalComponent;


  @Input() src;
  closeResult: string;

  imgSrc = null;

  avatar: any;

  idServicio: number;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: ServiciosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fields = this.myServicio.camposAdicionarServicio();

    // Recogiendo los datos enviados por la ruta
    this.idServicio = Number.parseInt(this.route.snapshot.paramMap.get('id'));

    this.myServicio.showServicio(this.idServicio).subscribe((data) => {

      if (data['items']) {
      const {nombre, descripcion, avatar, precio, categoria, activo} = data['items'];

      this.model = {
        ...this.model,
       nombre,
       descripcion,
       avatar,
       precio,
       activo,
       categoria: categoria.id
      };
      this.imgSrc = this.avatarServicio + '/' + this.idServicio +   '/' +  avatar;
    } else {
      this.notFoundSwal.show();
    }

  });
    // Elementos del formulario
    this.form = this.formBuilder.group({
      avatar: ['', []]
    });

  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.avatar = fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target['result'].toString();
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    const datos = Object.assign(this.form.value);

    const formData = new FormData();
    formData.append('datos', JSON.stringify(datos));
    if (this.avatar) {
      formData.append('avatar', this.avatar, 'avatar.png');
    }

    this.myServicio.editServicio(this.idServicio, formData).subscribe(
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
    this.router.navigateByUrl('/admin/servicios');
  }
}

