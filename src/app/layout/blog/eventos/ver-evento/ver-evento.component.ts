import { Component, OnInit, Input} from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Lightbox, IAlbum } from 'ngx-lightbox';

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.scss'],
  animations: [routerTransition()],
})
export class VerEventoComponent implements OnInit {
  urlFotoDestacada = environment.apiMedias + '/eventos/';
  fotosEvento: IAlbum[] = [];

  @Input() public evento;

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private _lightbox: Lightbox
  ) {}

  ngOnInit() {
    this.urlFotoDestacada +=  this.evento.id + '/' + this.evento.foto;
    this.fotosEvento = [
      {
        src: this.urlFotoDestacada,
        caption: 'Imagen principal',
        thumb: this.urlFotoDestacada,
      },
    ];
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.fotosEvento, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  cerrar() {
    this.modal.dismissAll();
  }
}
