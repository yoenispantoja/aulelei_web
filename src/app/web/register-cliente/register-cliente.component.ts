import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { DTOInternalUser } from '../../shared/models/DTOInternalUser';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { state } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.scss']
})
export class RegisterClienteComponent implements OnInit {

  // control para los mensajes de error
  error_messages = {
    'nombre_completo': [
      { type: 'required', message: 'El campo nombre y apellidos es requerido.' },
    ],
    'email': [
      { type: 'required', message: 'El correo electrónico es requerido' },
      { type: 'required', message: 'Entre un correo electrónico válido' }
    ],

    'password': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'Mínimo 8 caracteres' },
      { type: 'maxlength', message: 'Máximo 30 caracteres' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'Mínimo 8 caracteres' },
      { type: 'maxlength', message: 'Máximo 30 caracteres' },
    ],
  };

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
    ) { }
  @ViewChild('alertSwal', { static: true }) private alertSwal: SwalComponent;
  @ViewChild('alertSwal2', { static: true }) private alertSwal2: SwalComponent;

  public form: FormGroup;
  usuario = new DTOInternalUser();

  ngOnInit() {

    // Elementos del formulario
    this.form = this.formBuilder.group({
      nombre_completo: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    },
    {
      validators: this.password.bind(this)
    }
    );
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  cerrar() {
    this.modal.dismissAll();
  }

  onSubmit() {
    this.loginService.internalRegister(this.form.value).subscribe(result => {
      if (result.status === 200) {
        // Guardo los datos en el localsotore
        localStorage.setItem('socialUser', JSON.stringify(result.items));
        localStorage.setItem('token', result.items.token);
        this.cerrar();
        this.router.navigateByUrl('/reservar');
      } else {
        this.alertSwal.show();
      }
    }, (error: any) => {
      if (error.toString().includes('Error Code: 409')) {
      this.alertSwal2.show().then(() => {
        this.cerrar();
      });
    }
  });
}

getSocialUser(socialUser) {
   this.loginService.socialRegister(socialUser).subscribe(data => {
    if (data.status === 200) {
      // Guardo los datos en el localsotore
      localStorage.setItem('socialUser', JSON.stringify(data.items));
      localStorage.setItem('token', data.items.token);
      this.cerrar();
      this.router.navigateByUrl('/reservar');
    } else {
      this.alertSwal.show();
    }
  }, (error: any) => {
      if (error.toString().includes('Error Code: 409')) {
      this.alertSwal2.show().then(() => {
        this.cerrar();
      });
    }
  });
}

}
