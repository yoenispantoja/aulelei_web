import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, map, filter, take, switchMap, finalize } from "rxjs/operators";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToRequest(request)).pipe(
      map(res => res),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401 && err.headers.has("Token-Expired")) {
          // here code to refresh token if needed
        } else {
          return throwError(err);
        }
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string = null): HttpRequest<any> {
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    else {
      const currentUser = JSON.parse(localStorage.getItem('socialUser'));
      if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }
    return request;
  }
}