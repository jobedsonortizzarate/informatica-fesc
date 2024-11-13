import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { respuestaCatalogos } from 'src/app/models/catalogos/datosCatalogos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemitenteService {
  constructor(private http: HttpClient) {}

  getRemitentes() {

    const data : respuestaCatalogos = {
      
      
        "code": "200",
        "message": "Consulta Exitosa",
        "internalCode": "0000",
        "data": [
            {
              "id": 2,
              "nombre": "AUTORIDAD ESTATAL",
              estatus: 0
            },
            {
                "id": 4,
                "nombre": "INDEP",
                estatus: 0
            },
            {
                "id": 1,
                "nombre": "APF",
                estatus: 0
            },
            {
                "id": 3,
                "nombre": "AUTORIDAD MUNICIPAL",
                estatus: 0
            },
            {
                "id": 5,
                "nombre": "PERSONA MORAL",
                estatus: 0
            },
            {
                "id": 6,
                "nombre": "PERSONA FISICAS",
                estatus: 0
            },
            {
                "id": 7,
                "nombre": "PERSONA MORAL EXTRANJERA",
                estatus: 0
            },
            {
                "id": 8,
                "nombre": "PERSONA FISICA EXTRANJERA",
                estatus: 0
            }
        ],
        "correlationId": ""
    


    } ;

    return of(data);
  }


}
