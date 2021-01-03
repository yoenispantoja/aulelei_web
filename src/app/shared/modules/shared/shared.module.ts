import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safeHtml.pipe';
import { ImagenPipe } from '../../pipes/imagen.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SafeHtmlPipe, ImagenPipe],
  providers: [ ],
  exports: [SafeHtmlPipe, ImagenPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [  ]
    };
  }
 }
