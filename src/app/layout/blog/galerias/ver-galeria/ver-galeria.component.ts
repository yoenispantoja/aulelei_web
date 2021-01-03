import { Component, OnInit, Input} from "@angular/core";
import { routerTransition } from "src/app/router.animations";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: "app-ver-galeria",
  templateUrl: "./ver-galeria.component.html",
  styleUrls: ["./ver-galeria.component.scss"],
  animations: [routerTransition()],
})
export class VerGaleriaComponent implements OnInit {
  urlGalerias = environment.apiMedias + "galerias/";
  fotosGaleria: IAlbum[]=[];

  @Input() public galeria;

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private _lightbox: Lightbox
  ) {}

  ngOnInit() {
    const urlFotoPortada =  this.urlGalerias+ this.galeria.id + "/" + this.galeria.imagenPortada;
    this.fotosGaleria = [
      {
        src: urlFotoPortada,
        caption: "Imagen principal",
        thumb: urlFotoPortada,
      }
    ];

    //Adicionamos ahora las imagenes
    this.galeria.imagenes.map(item=>{
      this.fotosGaleria.push({
        src: this.urlGalerias+ this.galeria.id + "/" +item.nombreImagen,
        caption: item.nombreImagen,
        thumb:this.urlGalerias+ this.galeria.id + "/" +item.nombreImagen
      })
    })
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.fotosGaleria, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  cerrar() {
    this.modal.dismissAll();
  }
}
