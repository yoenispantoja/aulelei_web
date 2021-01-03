import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2"; //para los sweetAlerts
import { NgxSocialButtonModule } from "ngx-social-button"; //Para la autenticación con redes sociales

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-danger",
      cancelButtonClass: "btn"
    }),
    NgxSocialButtonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
