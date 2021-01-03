import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-web-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() reservarEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  reservar() {
    this.reservarEvent.emit();

  }

}
