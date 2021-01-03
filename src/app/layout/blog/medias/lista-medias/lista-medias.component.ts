import { Component, OnInit, ViewChild } from "@angular/core";
import { routerTransition } from "src/app/router.animations";
import { MediasService } from "src/app/shared/services/medias.service";
import { environment } from "src/environments/environment";
import { SwalComponent } from "@toverux/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: "app-lista-medias",
  templateUrl: "./lista-medias.component.html",
  styleUrls: ["./lista-medias.component.scss"],
  animations: [routerTransition()],
})
export class ListaMediasComponent implements OnInit {
  urlApi = environment.apiUrl + "/media"; // url del servicio del API
  urlMedias = environment.apiMedias + "/medias/";

  medias: IAlbum[] = [];

  @ViewChild("successSwal") private successSwal: SwalComponent;

  //**** Parámetros del dataTable */
  nombresColumnas = [
    "Imagen",
    "Nombre",
    "Tamaño",
    "Extensión",
    "Publicada por"
  ];

  columnasData: {};

  constructor(private myServicio: MediasService, private router: Router, private _lightbox: Lightbox) {}

  ngOnInit() {
    //Cargando la configuracion de las columnas
    this.columnasData = this.myServicio.getColumnasTablaMedias();

  }

  verDetallesMedia(row: any) {
    this.medias = [
      {
        src: this.urlMedias+'/'+row.nombre,
        caption: row.nombre,
        thumb: this.urlMedias + '/' + row.nombre,
      },
    ];
    this._lightbox.open(this.medias, 0);
  }



  eliminarMedia(row: number) {
    this.myServicio.deleteMedia(row).subscribe(
      (data) => {
        if (data) {
          this.successSwal.show();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
