import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.loadSwal(error.status);
        return throwError(errorMessage);
      })
    );
  }

  loadSwal(status: any) {
    let mensaje = '';
    switch (status) {
      case 400:
        mensaje = 'Credenciales incorrectas. Por favor, intente nuevamente';
        break;
      case 401:
        mensaje = 'Acceso no autorizado';
        break;
      case 404:
        mensaje = 'Recurso no encontrado en el sistema';
        break;
      case 409:
        mensaje = 'Ya existe un usuario con ese correo electrónico';
        break;
      case 500:
        mensaje = 'Ha ocurrido un error en el servidor';
        break;
      default:
          mensaje = 'Ha ocurrido un error inesperado. No hay conexión con el servidor de datos';
    }
    swal({
      title: 'Atención',
      text: mensaje,
      type: 'error',
      showConfirmButton: true,
    });
  }
}
