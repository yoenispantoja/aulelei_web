import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/shared/services/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WOW } from 'wowjs/dist/wow.min';
import { environment } from 'src/environments/environment';

const urlImagenEvento = environment.apiMedias + 'eventos/'; // url del servicio del API

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  idEvento: number;
  evento: any;
  fotoPortada: any;

  constructor(
    public eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router
    ) {

    }

  ngOnInit() {
    new WOW({live: false}).init();
    this.idEvento = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.eventosService.showEvento(this.idEvento).subscribe(data => {
      if (data['items']) {
        this.evento = data['items'];
        this.fotoPortada = `${urlImagenEvento}${this.idEvento}/${this.evento.foto}`;
      } else {
        this.router.navigateByUrl('/');
      }

    });
  }

}
