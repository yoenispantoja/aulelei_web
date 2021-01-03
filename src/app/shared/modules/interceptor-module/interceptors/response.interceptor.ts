import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) { }

    /**
     * Intercepta la response del servidor de cualquier llamada HTTP.
     * Ejecuta la request, y captura los errores, verifica si el status es 401.
     * Si es 401 solicita en refreshLoginService que se abra el dialogo de login, y retorna el error.
     * No reintenta la llamada una vez que se recibió el error.
     *
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                  return observableThrowError(error);

                } else {
                    return observableThrowError(error);
                }
            }),
        );
    }
}
