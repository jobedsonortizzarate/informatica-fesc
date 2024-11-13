import { Injectable } from '@angular/core';
import { ID_ESTADOS } from '../../shared/constantes/constantes';

@Injectable({
  providedIn: 'root',
})
export class CambioEntidadService {
  id_estados = ID_ESTADOS;

  constructor() {}

  cambioEntidad(idEntidad: string) {
    const cveEntidad = this.id_estados.find((el) => el.id_estado === idEntidad);

    if (cveEntidad) {
      return cveEntidad?.value;
    } else {
      return Number(idEntidad);
    }
  }
}
