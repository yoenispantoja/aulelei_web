import { LoginService } from './../../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  usuarioLogueado: string;


  constructor(
    public sidebarservice: SidebarService,
    public loginService: LoginService
  ) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('socialUser'));
    const rol = this.usuarioLogueado['rol']['id'];
    // Filtrando el menú por rol
    this.menus = this.menus.filter(menu => menu.roles.includes(rol));
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice
      .hasBackgroundImage;
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  cerrarSesion() {
    this.loginService.logout();
  }
}
