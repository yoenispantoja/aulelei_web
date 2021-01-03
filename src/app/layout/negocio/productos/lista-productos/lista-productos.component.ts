import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ProductosService } from '../../../../shared/services/productos.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
  animations: [routerTransition()],
})
export class ListaProductosComponent implements OnInit {

  categoriasProductos: any;
  public isCollapsed = false;

  @ViewChild('successSwal') private successSwal: SwalComponent;

  constructor(private productoProductos: ProductosService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    // cargando lista de categorías
    this.cargarProductos();
  }

  eliminarProducto(id: number) {
this.productoProductos.deleteProducto(id).subscribe(
      data => {
        if (data) {
          this.successSwal.show();
          this.cargarProductos();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editarProducto(id: number) {
    this.ngZone.run(() => this.router.navigate(['/admin/productos/editar-producto', id])).then();
  }

  cargarProductos() {
    this.productoProductos.getCategoriasProductos().subscribe(datos => {
      this.categoriasProductos = datos['items'];
    });
  }

}
