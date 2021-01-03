import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { DTOInternalUser } from '../../shared/models/DTOInternalUser';
import { RegisterClienteComponent } from '../register-cliente/register-cliente.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.scss'],
})
export class LoginClienteComponent implements OnInit {
  @ViewChild('alertSwal', { static: true }) private alertSwal: SwalComponent;
  @ViewChild('alertSwal2', { static: true }) private alertSwal2: SwalComponent;

  public form: FormGroup;

  usuario = new DTOInternalUser();

  // Abrir los modales de reserva
  closeResult: string;

  constructor(
    private modal1: NgbModal,
    private modal2: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // Elementos del formulario
    this.form = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  cerrar() {
    this.modal1.dismissAll();
  }

  onSubmit() {
    this.usuario.usuario = this.form.controls['email'].value;
    this.usuario.contrasenna = this.form.controls['password'].value;
    this.loginService.internalLogin(this.usuario).subscribe(
      (result) => {
        if (result.status === 200) {
          // Guardo los datos en el localsotore
          localStorage.setItem('socialUser', JSON.stringify(result.items));
          localStorage.setItem('token', result.items.token);
          this.cerrar();
          this.router.navigateByUrl('/reservar');
        } else {
          this.alertSwal.show();
        }
      },
      () => {
        this.alertSwal.show();
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  irRegistro() {
    this.cerrar();
    // cargando en modal la página de la vista de la publicación
    const vistaRegisterCliente = this.modal2.open(RegisterClienteComponent, {
      size: 'md',
    });

    vistaRegisterCliente.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getSocialUser(socialUser) {
    this.loginService.login(socialUser).subscribe(
      (data) => {
        if (data.status === 200) {
          // Guardo los datos en el localsotore
          localStorage.setItem('socialUser', JSON.stringify(data.items));
          localStorage.setItem('token', data.items.token);
          this.cerrar();
          this.router.navigateByUrl('/reservar');
        } else {
          this.alertSwal.show();
        }
      },
      (error: any) => {
        this.alertSwal2.show().then(() => {
          this.cerrar();
        });
      }
    );
  }
}
