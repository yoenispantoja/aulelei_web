import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'GENERAL',
      type: 'header',
      roles: [1, 2, 3, 4, 5]
    },
    {
      title: 'Sitio Web',
      icon: 'fa fa-globe',
      active: false,
      roles: [1, 2, 3],
      type: 'dropdown',
      submenus: [
        {
          title: 'Tablero',
          url: '/admin/dashboard'
        },
        {
          title: 'Publicaciones',
          url: '/admin/publicaciones',
          /*badge: {
            text: 'Pro ',
            class: 'badge-success'
          }*/
        },
        {
          title: 'Medias',
          url: '/admin/medias'
        },
        {
          title: 'Galerias',
          url: '/admin/galerias'
        },
        {
          title: 'Eventos',
          url: '/admin/eventos'
        },
      ]
    },
    {
      title: 'Negocio',
      icon: 'fa fa-cut',
      active: false,
      type: 'dropdown',
      roles: [1, 2, 4, 5],
     /* badge: {
        text: '3',
        class: 'badge-danger'
      },*/
      submenus: [
        {
          title: 'Reservas',
          url: '/admin/reservas'
        },
        {
          title: 'Servicios',
          url: '/admin/servicios'
        },
        {
          title: 'Productos',
          url: '/admin/productos'
        },
        {
          title: 'Órdenes',
          url: '/admin/ordenes'
        }
      ]
    },
    {
      title: 'Recursos Humanos',
      icon: 'fa fa-users',
      active: false,
      roles: [1, 2],
      type: 'dropdown',
      submenus: [
        {
          title: 'Trabajadores',
          url: '/admin/trabajadores'
        },
        {
          title: 'Clientes',
          url: '/admin/clientes'
        },
        {
          title: 'Gestión Salarial',
          url: '/admin/gestion-salarial'
        },
        {
          title: 'Reportes',
          url: '/admin/reportes'
        }
      ]
    },
    {
      title: 'ADMINISTRACIÓN',
      type: 'header',
      roles: [1, 2]
    },
    {
      title: 'Sistema',
      icon: 'fa fa-cogs',
      active: false,
      roles: [1, 2],
      type: 'dropdown',
      submenus: [
        {
          title: 'Usuarios',
          url: '/admin/usuarios'
        },
        {
          title: 'Roles',
          url: '/admin/roles'
        },
        {
          title: 'Permisos',
          url: '/admin/permisos'
        },
        {
          title: 'Configuración',
          url: '/admin/configuracion'
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
