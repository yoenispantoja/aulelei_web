import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string, id: number): any {
    let url = environment.apiMedias;

    if (img === 'default.png' && tipo === 'usuario') {
      return url + '/assets/user.png';
    }

    if (!img) {
      return url + '/assets/original.jpg';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += `/usuarios/${id}/${img}`;
        break;
      case 'publicacion':
        url += `/publicaciones/${id}/${img}`;
        break;
      case 'evento':
        url += `/eventos/${id}/${img}`;
        break;
      case 'galeria':
        url += `/galerias/${id}/${img}`;
        break;
      case 'media':
        url += `/medias/${id}/${img}`;
        break;
      case 'servicio':
        url += `/servicios/${id}/${img}`;
        break;
      case 'categorias_servicios':
        url += `/categorias_servicios/${img}`;
        break;
      case 'producto':
        url += `/productos/${id}/${img}`;
        break;
      default:
        console.log('tipo de imagen no existe');
        url += '/assets/original.jpg';
    }

    return url;
  }
}
