import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { TrabajadoresService } from 'src/app/shared/services/trabajadores.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { map } from 'rxjs/operators';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-trabajadores',
  templateUrl: './lista-trabajadores.component.html',
  styleUrls: ['./lista-trabajadores.component.scss'],
  animations: [routerTransition()]
})
export class ListaTrabajadoresComponent implements OnInit {
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('warningSwal') private warningSwal: SwalComponent;

  trabajadores: any[];
  filtroTrabajadores: any[];
  roles: any[];
  public rolesData: Object[] = [];
  public camposFiltro: Object = { text: 'Text', value: 'Id' };

  constructor(
    private servicioTrabajadores: TrabajadoresService,
    private servicioUsuarios: UsuariosService,
    private route: Router,
    private ngZone: NgZone

    ) { }

  ngOnInit() {
   this.loadTrabajadores();

    this.servicioUsuarios.getRoles().pipe(
      map((datos) =>
        datos['items'].filter((rol) => rol.id !== 1 && rol.id !== 6 ))
      ).subscribe(resultados => {
        this.roles = resultados;
        this.roles.map(rol => {
          this.rolesData.push({
            'Id': rol.id,
            'Text': rol.nombre
          });
        });
      });
  }

  editarTrabajador(id: number) {
    this.ngZone.run(() => this.route.navigate(['/admin/trabajadores/editar-trabajador', id])).then();
  }

  eliminarTrabajador(id: number) {
    this.warningSwal.show().then((result) => {
     if (result.value) {
       this.servicioTrabajadores.deleteTrabajador(id).subscribe(() => {
         this.successSwal.show();
         this.loadTrabajadores();
       });
      }
    });
  }

  filtrarTrabajador(categoria: any) {
    if (categoria && categoria.value) {
      this.filtroTrabajadores = this.trabajadores.filter(trabajador => trabajador.usuario.rol.id === Number.parseInt(categoria.value));
    } else {
      this.loadTrabajadores();
    }
  }

  loadTrabajadores() {
    this.servicioTrabajadores.getTrabajadores().subscribe(datos => {
      this.trabajadores = datos['items'];
      this.filtroTrabajadores = this.trabajadores;
      });
  }

}
