import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { SocialService } from "ngx-social-button";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  usuario: any = "Yoenis";
  avatarSrc: string;

  public pushRightClass: string;

  constructor(
    public router: Router,
    private socialAuthService: SocialService
  ) {


    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = "push-right";
    //Chequeando la información de usuario logueado
    if (localStorage.getItem("socialUser")) {
      this.usuario = JSON.parse(localStorage.getItem("socialUser")).name;
      this.avatarSrc = JSON.parse(localStorage.getItem("socialUser")).image;
    }
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector("body");
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector("body");
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector("body");
    dom.classList.toggle("rtl");
  }

  signOut() {
    if (this.socialAuthService.isSocialLoggedIn()) {
      this.socialAuthService
        .signOut()
        .then(() => {
          this.router.navigateByUrl("login");
          localStorage.clear();
        })
        .catch(err => {});
    }
  }

}
