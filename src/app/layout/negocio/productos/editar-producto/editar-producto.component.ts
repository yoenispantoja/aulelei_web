import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { ProductosService } from 'src/app/shared/services/productos.service';
import { routerTransition } from 'src/app/router.animations';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
  animations: [routerTransition()],
})
export class EditarProductoComponent implements OnInit {
  avatarProducto = environment.apiMedias + 'productos';
  @ViewChild('confirmSwal', { static: true })
  private confirmSwal: SwalComponent;
  @ViewChild('notFoundSwal', { static: true })
  private notFoundSwal: SwalComponent;

  @Input() src;
  closeResult: string;
  imgSrc = null;
  avatar: any;
  idProducto: number;

  // Elementos del formulario
  form = new FormGroup({});
  model = {};
  fields = [];
  options: FormlyFormOptions = {};

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fields = this.productoService.camposAdicionarProducto();

    // Recogiendo los datos enviados por la ruta
    this.idProducto = Number.parseInt(this.route.snapshot.paramMap.get('id'));

    this.productoService.showProducto(this.idProducto).subscribe((data) => {
      if (data['items']) {
        const {
          codigo,
          nombre,
          descripcion,
          avatar,
          precio,
          um,
          categoria,
          cantidad_stock,
          disponible
        } = data['items'];

        this.model = {
          ...this.model,
          codigo,
          nombre,
          descripcion,
          avatar,
          precio,
          um,
          categoria: categoria.id,
          cantidad_stock,
          disponible
        };
        this.imgSrc =
          this.avatarProducto + '/' + this.idProducto + '/' + avatar;
      } else {
        this.notFoundSwal.show();
      }
    });
    // Elementos del formulario
    this.form = this.formBuilder.group({
      avatar: ['', []],
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

    this.productoService.editProducto(this.idProducto, formData).subscribe(
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
    this.router.navigateByUrl('/admin/productos');
  }
}
