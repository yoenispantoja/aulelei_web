import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


    constructor(
        private _router: Router
    ) {
    }

    ngOnInit() {

        // Refrescando las vistas en cada cambio de ruta
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this._router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this._router.navigated = false;
                window.scrollTo(0, 0);
            }
        });


    }
}
