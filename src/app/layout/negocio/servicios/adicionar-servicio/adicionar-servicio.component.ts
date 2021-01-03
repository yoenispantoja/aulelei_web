import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { ServiciosService } from 'src/app/shared/services/servicios.service';
import { routerTransition } from 'src/app/router.animations';
import { CodiguerasService } from 'src/app/shared/services/codigueras.service';
import { FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-adicionar-servicio',
  templateUrl: './adicionar-servicio.component.html',
  styleUrls: ['./adicionar-servicio.component.scss'],
  animations: [routerTransition()],
})
export class AdicionarServicioComponent implements OnInit {
  @ViewChild('confirmSwal', { static: true })
  private confirmSwal: SwalComponent;

  @Input() src;
  closeResult: string;

  imgSrc = null;

  avatar: any;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: ServiciosService
  ) {}

  ngOnInit() {
    this.fields = this.myServicio.camposAdicionarServicio();
    // Elementos del formulario
    this.form = this.formBuilder.group({
      avatar: ['', [Validators.required]],
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
    formData.append('avatar', this.avatar, 'avatarServicio.png');

    this.myServicio.addServicio(formData).subscribe(
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
    this.imgSrc = null;
  }
}
