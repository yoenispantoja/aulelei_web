import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor() {}

    /**
     * Intercepta la request y la ejecuta, por el momento no hace nada,
     * pero es el punto donde se pueden agregar headers, excluir rutas, etc.
     *
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const cloned = req.clone();
        // hacer algo con la request
        // return next.handle(cloned);
        return next.handle(req);
    }
}
