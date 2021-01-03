import { DTOServicio } from './../../shared/models/DTOServicio';
import { ServiciosService } from './../../shared/services/servicios.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-servicios',
  templateUrl: './detalle-servicios.component.html',
  styleUrls: ['./detalle-servicios.component.scss']
})
export class DetalleServiciosComponent implements OnInit {

  @Input() datosEnviados;

  servicios: DTOServicio[] = [];

  constructor(private modal: NgbModal, private serviceServicios: ServiciosService) { }

  ngOnInit() {
    // Cargo los servicios
    this.serviceServicios.getServiciosCategoria(this.datosEnviados.idCategoria).subscribe(datos => {
      this.servicios = datos['items'].servicios;
    });
  }

  cerrar() {
    this.modal.dismissAll();
  }



}
