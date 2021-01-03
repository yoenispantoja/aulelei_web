import { Component, OnInit, Input} from "@angular/core";
import { routerTransition } from "src/app/router.animations";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: "app-ver-publicacion",
  templateUrl: "./ver-publicacion.component.html",
  styleUrls: ["./ver-publicacion.component.scss"],
  animations: [routerTransition()],
})
export class VerPublicacionComponent implements OnInit {
  urlFotoDestacada = environment.apiMedias + "/publicaciones/";
  fotosPublicacion: IAlbum[]=[];

  @Input() public publicacion;

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private _lightbox: Lightbox
  ) {}

  ngOnInit() {
    this.urlFotoDestacada +=  this.publicacion.id + "/" + this.publicacion.imagenDestacada;
    this.fotosPublicacion = [
      {
        src: this.urlFotoDestacada,
        caption: "Imagen principal",
        thumb: this.urlFotoDestacada,
      },
    ];
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.fotosPublicacion, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  cerrar() {
    this.modal.dismissAll();
  }
}
