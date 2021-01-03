import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { GaleriasService } from 'src/app/shared/services/galerias.service';

import { DTOPublicacion } from './../../shared/models/DTOPublicacion';
import { DTOGaleria } from './../../shared/models/DTOGaleria';

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, switchMap, filter } from 'rxjs/operators';
import { WOW } from 'wowjs/dist/wow.min';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { EventosService } from 'src/app/shared/services/eventos.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginClienteComponent } from '../login-cliente/login-cliente.component';
import { Router } from '@angular/router';
import { DetalleServiciosComponent } from '../detalle-servicios/detalle-servicios.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  publicaciones: any[] = [];

  arregloDeArreglos = [];

  galerias: DTOGaleria[] = [];

  eventos: any[] = [];

  urlImagenesPortadaPublicaciones = environment.apiMedias + 'publicaciones/'; // url del servicio del API
  urlImagenesPortadaGalerias = environment.apiMedias + 'galerias/'; // url del servicio del API
  urlImagenesPortadaEventos = environment.apiMedias + 'eventos/'; // url del servicio del API

  public isMenuCollapsed = true;
  public isBuscadorCollapsed = true;

  // Abrir los modales de reserva
  closeResult: string;

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    autoWidth: true,
    startPosition: 0,
    // tslint:disable-next-line: max-line-length
    navText: [
      '<i class="fa fa-arrow-circle-left" title="Anterior"></i>',
      '<i class="fa fa-arrow-circle-right" title="Siguiente"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
        margin: 20,
      },
      800: {
        items: 3,
        margin: 20,
      },
      1000: {
        items: 4,
        margin: 20,
      },
    },
  };

  customOptions1: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    autoWidth: true,
    autoplay: true,
    startPosition: 0,
    // tslint:disable-next-line: max-line-length
    navText: [
      '<i class="fa fa-arrow-circle-left" title="Anterior"></i>',
      '<i class="fa fa-arrow-circle-right" title="Siguiente"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 1,
        margin: 20,
      },
      1024: {
        items: 1,
        margin: 20,
      },
    },
  };

  textoUsuario: string;

  constructor(
    public publicacionesService: PublicacionesService,
    public galeriasService: GaleriasService,
    public eventosService: EventosService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    // Chequea usuario logueado
    this.usuarioLogueado();
    new WOW({
      live: false,
    }).init();
    // Cargando las publicaciones (filtrando solo las que tienen estado publicado)
    this.publicacionesService
      .getPublicaciones()
      .pipe(
        map((datos) =>
          datos['items'].filter((publicacion) => publicacion.estado.id === 3)
        )
      )
      .subscribe((resultado) => {
        this.publicaciones = resultado;
        for (let i = 0; i < resultado.length; i += 3) {
          const pedazo = resultado.slice(i, i + 3);
          this.arregloDeArreglos.push(pedazo);
        }
      });

    // Cargando las galerias
    this.galeriasService
      .getGalerias()
      .pipe(
        map((datos) =>
          datos['items'].filter((galeria) => galeria.estado.id === 3)
        )
      )
      .subscribe((resultado) => {
        this.galerias = resultado;
      });

    // Cargando los eventos
    this.eventosService
      .getEventos()
      .pipe(
        map(
          (datos) => datos['items'] // .filter(/*(evento) => evento.estado.id === 3*/)
        )
      )
      .subscribe((resultado) => {
        this.eventos = resultado;
      });
  }


usuarioClick() {
  if (JSON.parse(localStorage.getItem('socialUser'))) {
    localStorage.clear();
    this.usuarioLogueado();
  }
}

  concatImageUrl(categoria: string, id: number, nombreImagen: string) {
    let intro = '';
    switch (categoria) {
      case 'publicacion': {
        intro = this.urlImagenesPortadaPublicaciones;
        break;
      }
      case 'galeria': {
        intro = this.urlImagenesPortadaGalerias;
        break;
      }
      case 'evento': {
        intro = this.urlImagenesPortadaEventos;
        break;
      }
    }
    return `${intro}${id}/${nombreImagen}`;
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Cargar modal de login cliente

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  abrirModalLoginCliente() {
    // Si ya está logueado lo mando directo a la página de reserva

    if (JSON.parse(localStorage.getItem('socialUser'))) {
      this.router.navigateByUrl('/reservar');
    } else {
      // cargando en modal la página de la vista de la publicación
      const vistaLoginCliente = this.modalService.open(LoginClienteComponent, {
        size: 'md',
      });

      vistaLoginCliente.result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  // Cargar modal de servicios
  verServicios(id: number, nombreCategoria, nombreImagen) {
    const vistaServicios = this.modalService.open(DetalleServiciosComponent, {
      windowClass: 'clsModal'
    });
    const data = {
      idCategoria: id,
      nombreCategoria: nombreCategoria,
      nombreImagenCategoria: nombreImagen
    };
    vistaServicios.componentInstance.datosEnviados = data;
  }

  // usuario logueado
  usuarioLogueado(): boolean {
    if (JSON.parse(localStorage.getItem('socialUser'))) {
      this.textoUsuario = JSON.parse(localStorage.getItem('socialUser')).nombre;
      return true;
    } else {
      return false;
    }
  }

  goTienda() {
    this.router.navigateByUrl('/tienda');
  }
}
