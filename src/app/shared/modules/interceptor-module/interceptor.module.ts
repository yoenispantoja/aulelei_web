import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { RequestInterceptor } from '../interceptor-module/interceptors/request.interceptor';


/***
 * Módulo que declara como providers a los Interceptors de HttpClientModule que se quieren agregar en el proyecto.
 * Si se quieren agregar interceptores generales, deben incluirse en este módulo.
 * Para que estén disponibles, ese módulo debe ser importado solamente en el módulo raíz (AppModule) cuando se usa lazy loading
 * sino se generarán varias instancias de cada provider.
 * Si no se utiliza lazy loading, debe ser importado en todos los módulos que hayan providers con requests que se quieran interceptar.
 *
 */
@NgModule({
    imports: [CommonModule],
    declarations: [],
})
export class NgpInterceptorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgpInterceptorModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestInterceptor,
                    multi: true,
                },
                { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
            ],
        };
    }
}
