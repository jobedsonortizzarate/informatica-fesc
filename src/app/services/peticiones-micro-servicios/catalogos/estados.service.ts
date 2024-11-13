import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { respuestaCatalogos } from 'src/app/models/catalogos/datosCatalogos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  getDataList() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getEstados() {
    return of(JSON.parse(`{
    "code": "200",
    "message": "Consulta Exitosa",
    "internalCode": "0000",
    "data": [
        {
            "id": 2,
            "nombre": "BAJA CALIFORNIA",
            "estatus": 1
        },
        {
            "id": 3,
            "nombre": "BAJA CALIFORNIA SUR",
            "estatus": 1
        },
        {
            "id": 4,
            "nombre": "CAMPECHE",
            "estatus": 1
        },
        {
            "id": 7,
            "nombre": "CHIAPAS",
            "estatus": 1
        },
        {
            "id": 8,
            "nombre": "CHIHUAHUA",
            "estatus": 1
        },
        {
            "id": 9,
            "nombre": "CIUDAD DE MÉXICO",
            "estatus": 1
        },
        {
            "id": 5,
            "nombre": "COAHUILA DE ZARAGOZA",
            "estatus": 1
        },
        {
            "id": 6,
            "nombre": "COLIMA",
            "estatus": 1
        },
        {
            "id": 10,
            "nombre": "DURANGO",
            "estatus": 1
        },
        {
            "id": 11,
            "nombre": "GUANAJUATO",
            "estatus": 1
        },
        {
            "id": 12,
            "nombre": "GUERRERO",
            "estatus": 1
        },
        {
            "id": 13,
            "nombre": "HIDALGO",
            "estatus": 1
        },
        {
            "id": 14,
            "nombre": "JALISCO",
            "estatus": 1
        },
        {
            "id": 15,
            "nombre": "MEXICO",
            "estatus": 1
        },
        {
            "id": 16,
            "nombre": "MICHOACAN DE OCAMPO",
            "estatus": 1
        },
        {
            "id": 17,
            "nombre": "MORELOS",
            "estatus": 1
        },
        {
            "id": 18,
            "nombre": "NAYARIT",
            "estatus": 1
        },
        {
            "id": 19,
            "nombre": "NUEVO LEON",
            "estatus": 1
        },
        {
            "id": 20,
            "nombre": "OAXACA",
            "estatus": 1
        },
        {
            "id": 21,
            "nombre": "PUEBLA",
            "estatus": 1
        },
        {
            "id": 22,
            "nombre": "QUERETARO",
            "estatus": 1
        },
        {
            "id": 23,
            "nombre": "QUINTANA ROO",
            "estatus": 1
        },
        {
            "id": 24,
            "nombre": "SAN LUIS POTOSI",
            "estatus": 1
        },
        {
            "id": 25,
            "nombre": "SINALOA",
            "estatus": 1
        },
        {
            "id": 0,
            "nombre": "SIN ENTIDAD FEDERATIVA",
            "estatus": 1
        },
        {
            "id": 26,
            "nombre": "SONORA",
            "estatus": 1
        },
        {
            "id": 27,
            "nombre": "TABASCO",
            "estatus": 1
        },
        {
            "id": 28,
            "nombre": "TAMAULIPAS",
            "estatus": 1
        },
        {
            "id": 29,
            "nombre": "TLAXCALA",
            "estatus": 1
        },
        {
            "id": 30,
            "nombre": "VERACRUZ DE IGNACIO DE LA LLAVE",
            "estatus": 1
        },
        {
            "id": 31,
            "nombre": "YUCATAN",
            "estatus": 1
        },
        {
            "id": 32,
            "nombre": "ZACATECAS",
            "estatus": 1
        }
    ],
    "correlationId": ""
}`));
    }
}
