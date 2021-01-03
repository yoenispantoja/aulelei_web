import { Component, OnInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { GaleriasService } from 'src/app/shared/services/galerias.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, IAlbum } from 'ngx-lightbox';

const urlImagenesGalerias = environment.apiMedias + 'galerias/'; // url del servicio del API

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  idGaleria: number;
  galeria: any;
  fotosGaleria: IAlbum[] = [];

  constructor(
    private galeriasService: GaleriasService,
    private route: ActivatedRoute,
    private router: Router,
    private _lightbox: Lightbox
    ) { }

  ngOnInit() {
    new WOW({live: false}).init();
    this.idGaleria = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.galeriasService.showGaleria(this.idGaleria).subscribe(data => {
      if (data['items']) {
        this.galeria = data['items'];
      // Lleno la galería del Lightbox
      this.galeria.imagenes.map(item => {
        this.fotosGaleria.push({
          src: `${urlImagenesGalerias}${this.idGaleria}/${item.nombreImagen}`,
          caption: this.galeria.nombre,
          thumb: `${urlImagenesGalerias}${this.idGaleria}/${item.nombreImagen}`
        });
      });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.fotosGaleria, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
