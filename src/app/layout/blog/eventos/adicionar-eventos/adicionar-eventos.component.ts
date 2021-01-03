import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { EventosService } from 'src/app/shared/services/eventos.service';
import { routerTransition } from 'src/app/router.animations';
import { CodiguerasService } from 'src/app/shared/services/codigueras.service';
import { FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-adicionar-eventos',
  templateUrl: './adicionar-eventos.component.html',
  styleUrls: ['./adicionar-eventos.component.scss'],
  animations: [routerTransition()],
})
export class AdicionarEventosComponent implements OnInit {
  @ViewChild('confirmSwal', { static: true })
  private confirmSwal: SwalComponent;

  @Input() src;
  closeResult: string;

  imgSrc = null;

  imagenPortada: any;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private myServicio: EventosService
  ) {}

  ngOnInit() {
    this.fields = this.myServicio.camposAdicionarEventos();
    // Elementos del formulario
    this.form = this.formBuilder.group({
      imagenPortada: ['', [Validators.required]],
    });
  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.imagenPortada = fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target['result'].toString();
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    const datos = Object.assign(this.form.value, {
      publicadoPor: JSON.parse(localStorage.getItem('socialUser')).id,
    });

    const formData = new FormData();
    formData.append('datos', JSON.stringify(datos));
    formData.append('imagenPortada', this.imagenPortada, 'portadaEvento.png');

    this.myServicio.addEvento(formData).subscribe(
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
