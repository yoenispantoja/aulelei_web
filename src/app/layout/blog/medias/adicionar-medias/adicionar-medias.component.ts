import { Component, OnInit, ViewChild } from "@angular/core";
import { routerTransition } from "src/app/router.animations";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { SwalComponent } from "@toverux/ngx-sweetalert2";

@Component({
  selector: "app-adicionar-medias",
  templateUrl: "./adicionar-medias.component.html",
  styleUrls: ["./adicionar-medias.component.scss"],
  animations: [routerTransition()],
})
export class AdicionarMediasComponent implements OnInit {
  urlApi = environment.apiUrl + "/media"; // url del servicio del API

  @ViewChild("confirmSwal", { static: true })
  private confirmSwal: SwalComponent;

  //Elementos del ng-file-uploader
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor() {
    this.uploader = new FileUploader({
      url: this.urlApi,
      authToken: "Bearer " + localStorage.getItem("token"),
      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      headers: [
        { name: "Access-Control-Allow-Origin", value: "*" },
        { name: "Access-Control-Allow-Methods", value: "POST, OPTIONS, GET" },
        { name: "Access-Control-Allow-Credentials", value: "true" },
      ],
      formatDataFunctionIsAsync: false,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.hasBaseDropZoneOver = false;
    this.response = "";
    this.uploader.response.subscribe((res) => (this.response = res));

    // Al terminar la subida
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log(status);
      if (status == 200) {
        this.confirmSwal.show();
      }
    };
  }

  onFileSelected(event: any) {
    //console.log(event);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {}

  cerrarVentana() {}
}
