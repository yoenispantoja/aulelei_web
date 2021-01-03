import { DTOProducto } from './../../shared/models/DTOProducto';
import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  productos: DTOProducto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    new WOW({live: false}).init();
    this.productosService.getProductos().subscribe(data => {
      console.log(data['items']);
      this.productos = data['items'];
    });
  }

}
