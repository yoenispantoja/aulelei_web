import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ServiciosService } from 'src/app/shared/services/servicios.service';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  animations: [routerTransition()],
})
export class EditarUsuarioComponent implements OnInit {

  urlUsuarios = environment.apiMedias + 'usuarios';

  @ViewChild('confirmSwal', { static: true })
  private confirmSwal: SwalComponent;
  @ViewChild('notFoundSwal', { static: true })
  private notFoundSwal: SwalComponent;

  closeResult: string;

  imgSrc = null;

  imagenUsuario: any;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  idUsuario: number;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idUsuario = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.fields = this.usuarioService.camposAdicionarUsuario();
       // Cargar datos del usuario
    this.usuarioService
      .showUsuario(this.idUsuario)
      .subscribe((data) => {
        if (data['items']) {
          const { nombre,
            email,
            img,
            rol,
            active,
            google,
            created_at
          } = data['items'];

          this.model = {
            ...this.model,
            nombre,
            email,
            img,
            rolId: rol.id,
            active,
            google,
            created_at: created_at.slice(0, 10)
          };
          if (img.indexOf('https') >= 0) {
            this.imgSrc = img;
          } else if (img !== 'default.png') {
            this.imgSrc = this.urlUsuarios + '/' + this.idUsuario + '/' + img;
          } else {
            this.imgSrc = environment.apiMedias + '/assets/user.png';
          }

        } else {
          this.notFoundSwal.show();
        }

      });

      // Elementos del formulario
    this.form = this.formBuilder.group({
      imagenUsuario: ['', []],
    });


  }

  loadImage(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.imagenUsuario = fileInput.target.files[0];
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
    if (this.imagenUsuario) {
      formData.append('avatar', this.imagenUsuario, 'avatar.png');
    }

    this.usuarioService.editUsuario(this.idUsuario, formData).subscribe(
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
    this.router.navigate(['/admin/usuarios']);
  }


}
