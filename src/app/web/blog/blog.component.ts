import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { PublicacionesService } from 'src/app/shared/services/publicaciones.service';
import { DTOPublicacion } from '../../shared/models/DTOPublicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

const urlImagenesPortadaPublicaciones = environment.apiMedias + 'publicaciones/'; // url del servicio del API

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  publicacion: any;
  publicaciones: any[] = [];
  comentarios: any[] = [];
  idPublicacion: number;
  fotoPortada: any;

  // Elementos del formulario
  public form: FormGroup;
  nombre: String;
  email: String;
  comentario: String;


  constructor(
    public publicacionesService: PublicacionesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    new WOW({live: false}).init();

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.email]],
      comentario: ['', [Validators.required]]
    });

  // Cargando la publicacion
  // tslint:disable-next-line:radix
  this.idPublicacion = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  this.publicacionesService.showPublicacion(this.idPublicacion).subscribe(data => {
    if (data['items']) {
      this.publicacion = data['items'];
      // filtro solo los comentarios aprobados
      this.comentarios = this.publicacion.comentarios.filter(comentario => comentario.estado === 1);
      this.fotoPortada = urlImagenesPortadaPublicaciones + this.idPublicacion + '/' + this.publicacion.imagenDestacada;
    } else {
      this.router.navigateByUrl('/');
    }
  });

  // cargando los últimos diez post
  // Cargando las publicaciones (filtrando solo las que tienen estado publicado)
  this.publicacionesService
  .getPublicaciones()
  .pipe(
    map((datos) =>
      datos['items'].filter((publicacion) => publicacion.estado.id === 3 && publicacion.id !== this.idPublicacion)
    )
  )
  .subscribe((resultado) => {
    this.publicaciones = resultado;
  });

  }

  urlfotoPortada(id: number, nombreFoto: string) {
    return `${urlImagenesPortadaPublicaciones}${id}/${nombreFoto}`;
  }

  enviarComentario() {
    const datos = Object.assign(this.form.value, {
      publicacionId: this.idPublicacion
    });

    this.publicacionesService.adicionarComentario(datos).subscribe(resultado => {
      swal({
        title: '<strong>Información</strong>',
        type: 'info',
        html:
          '<b>Su comentario ha sido enviado para moderación </b> ',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Gracias por visitarnos!',
        confirmButtonAriaLabel: 'Thumbs up, great!'
      }).then((result) => {
        if (result.value) {
          this.form.reset();
        }
      });
    });
  }


}
