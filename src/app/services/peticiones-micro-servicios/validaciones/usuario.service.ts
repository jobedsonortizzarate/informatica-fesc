import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  respuesta,
  respuestaCurp,
  respuestaLogin,
  respuestaRegSolicitud,
} from 'src/app/models/datosRespuestaGen.model';
import { environment } from 'src/environments/environment';
import { certificado } from 'src/app/models/datosCertificado.model';
import { datosCurp } from 'src/app/models/datosValidaciones.model';
import { usuarioRegistro } from 'src/app/models/datosRegistroUsuario.model';
import {
  datosContrasenaRecuperada,
  DatosCuentaRecuperada,
  datosLogin,
  datosRecuperaSesion,
  datosRecuperaUsuario,
  datosUsuarioRU,
} from 'src/app/models/datosUsuarios.model';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
  ) {}

  getValidarCertificado(certificado: certificado) {
    return this.http.post<respuesta>(
      `${environment.API_URL_ORG}/sing-xml`,
      certificado,
    );
  }

  getValidaCurp(datos: datosCurp) {
    return of(JSON.parse(`
      

      {
    "code": "200",
    "message": "Consulta Exitosa",
    "internalCode": "0000",
    "correlationId": "_bwjJ0wVdUUtyFniNIqi5bDFC-23k3FreJ5TLXevkvqPiBCVqM18!-1796744244!1731461598229",
    "data": {
        "_attributes": {
            "diffgr:id": "",
            "msdata:rowOrder": "",
            "diffgr:hasChanges": ""
        },
        "CURP": "OIZJ760212HDFRRB05",
        "apellido1": "ORTIZ",
        "apellido2": "ZARATE",
        "nombres": "JOB EDSON",
        "sexo": "H",
        "fechNac": "12/02/1976",
        "nacionalidad": "MEX",
        "docProbatorio": "1",
        "anioReg": "1977",
        "foja": "",
        "tomo": "",
        "libro": "",
        "numActa": "00186",
        "CRIP": "",
        "numEntidadReg": "09",
        "cveMunicipioReg": "005",
        "NumRegExtranjeros": "",
        "FolioCarta": "",
        "cveEntidadNac": "DF",
        "cveEntidadEmisora": "",
        "statusCurp": "RCN"
    }
}

      `));
  }

  postEnviaRegistroUsuario(datos: usuarioRegistro) {
    return this.http.post<respuesta>(
      `${environment.API_URL_EXTERNOS}/usuario/add-registro-solicitante`,
      datos,
    );
  }

  postEnviaRegUsuarioEFirma(datos: usuarioRegistro) {
    return this.http.post<respuesta>(
      `${environment.API_URL}/registro-usuario-efirma`,
      datos,
    );
  }

  getValidaRegistro(rfc: string) {
    return this.http.get<respuesta>(
      `${environment.API_URL}/find-usuario/${rfc}`,
    );
  }

  getSolicitudes(rfc: string) {
    return of(JSON.parse(`{
    "code": "204",
    "internalCode": "1000",
    "message": "Busqueda vacía TrackInfo: 642d238d-70a6-4e5c-b4d9-473e98b6b453",
    "correlationId": "",
    "data": {
        "error": "Búsqueda sin resultados.",
        "timestamp": "2024-11-13T00:39:31.374Z"
    }
    }`));
  }

  
  getValidaRegistroUnico(rfc: string) {
     return of(JSON.parse(`{
    "code": "200",
    "internalCode": "1000",
    "message": "El RFC OIZJ760212UC7 No se encuentra en registro unico. TrackInfo: b2258b52-ac30-447c-bb6d-71baa9d6d26e",
    "correlationId": "",
    "data": {
        "error": "Validación no satisfactoria",
        "timestamp": "2024-11-13T00:39:31.276Z"
    }
                    }`))     ;


  


  }

  findUsuarioCURP(curp: string) {
    return of(JSON.parse(`
      

      {
    "code": "200",
    "message": "Ok",
    "internalCode": "0000",
    "data": {
        "id": 4156,
        "curp": "OIZJ760212HDFRRB05",
        "accountExpired": false,
        "accountLocked": false,
        "apellidoMaterno": "ZARATE",
        "apellidoPaterno": "ORTIZ",
        "archivoFoto": null,
        "banco": null,
        "calle": null,
        "clabe": null,
        "codigo": null,
        "codigoPostal": null,
        "colonia": null,
        "comentariosEstatus": null,
        "correo": "jobedson@hotmail.com",
        "cuentaCheques": null,
        "date_created": "2024-08-05T16:44:24.202+00:00",
        "enabled": true,
        "estado": "CIUDAD DE MÉXICO",
        "estatusCliente": 0,
        "idAutor": null,
        "lastUpdated": "2024-08-05T16:44:24.202+00:00",
        "municipio": null,
        "nombre": "JOB EDSON",
        "pais": "MEXICO",
        "passwordExpired": false,
        "razonSocial": null,
        "rfc": "OIZJ760212UC6",
        "rfcRepresentante": null,
        "sesionActiva": false,
        "sessionId": "2QrMAcZl/YeZ+MeWgW7irRavZSEIR6wA8gpLPg+GB+EWvmNCeD93FvA9M/xyd8ovdgsRGmyfbzFaqNbdqzqfx6i/gbOQlzQhuxxYXPuCxIY=",
        "sucursal": null,
        "telefono": null,
        "tipoPersona": 1,
        "totalVisitas": 0,
        "username": "jobedson",
        "regimenFiscal": 0,
        "clienteIndep": false,
        "clienteTcr": false,
        "consext": 0,
        "cveifiscal": null
    },
    "correlationId": ""
}

      
      `));
  }
  findUsuarioCorreo(correo: string) {
    return of(JSON.parse(`{
      "code": "200",
      "internalCode": "0000",
      "message": "Busqueda vacía TrackInfo: 642d238d-70a6-4e5c-b4d9-473e98b6b453",
      "correlationId": "",
      "data": {
          "error": "Búsqueda sin resultados.",
          "timestamp": "2024-11-13T00:39:31.374Z"
      }
      }`));
  }

  getLoginRegistroUnico(datos: datosUsuarioRU) {
    return this.http.post<respuesta>(
      `${environment.API_URL}/find-datos-registro-unico`,
      datos,
    );
  }

  getLogin(datos: datosLogin) {
    return this.http.post<respuestaLogin>(
      `${environment.API_URL_SOLICITANTES}/login`,
      datos,
    );
  }

  getRecuperaSesion(datos: datosRecuperaSesion) {
    return this.http.post<respuestaLogin>(
      `${environment.API_URL_SOLICITANTES}/recuperaSesion`,
      datos,
    );
  }

  getDatosRFC(rfc: string) {
    return this.http.get<any>(
      `${environment.API_URL}/find-datos-usuario-rfc/${rfc}`,
    );
  }

  updateDatosUsuario(datos: datosRecuperaUsuario) {
    return this.http.post<any>(
      `${environment.API_URL}/update-recuperacion-cuenta`,
      datos,
    );
  }

  getDatosUsuarioRegistrado(id: string) {
    return this.http.get<any>(
      `${environment.API_URL}/find-usuario-registro-unico-uuid/${id}`,
    );
  }

  getActivarUsuario(token: string) {
    return this.http.get<any>(
      `${environment.API_URL}/find-usuario-token-activar/${token}`,
    );
  }
  getRecuperacionCuenta(token: string) {
    return this.http.get<any>(
      `${environment.API_URL}/find-usuario-token-recuperacion/${token}`,
    );
  }

  postCuentaRecuperada(datos: DatosCuentaRecuperada) {
    return this.http.post<any>(
      `${environment.API_URL}/recuperacion-actualiza-cuenta/`,
      datos,
    );
  }

  getPersona(id: string | null | undefined) {
    return this.http.get<respuesta>(
      `http://localhost:4030/sidep-core/solicitud/obtener-persona/${id}`,
    );
  }

  getDatosUsuarioRecuperar(usuario: string) {
    return this.http.get<respuestaRegSolicitud>(
      `${environment.API_URL}/find-usuario-recuperar-contrasena/${usuario}`,
    );
  }

  updateContrasenaUsuario(datos: datosContrasenaRecuperada) {
    return this.http.post<any>(
      `${environment.API_URL}/update-contrasena-recuperada`,
      datos,
    );
  }

  findUsuarioSidep(correo: string) {
    return of(JSON.parse(`{
      "code": "200",
      "internalCode": "1000",
      "message": "Busqueda vacía TrackInfo: 642d238d-70a6-4e5c-b4d9-473e98b6b453",
      "correlationId": "",
      "data": {
          "error": "Búsqueda sin resultados.",
          "timestamp": "2024-11-13T00:39:31.374Z"
      }
      }`));
  }

  findUsuarioUsername(username: string) {
    return of(JSON.parse(`{
      "code": "200",
      "internalCode": "1000",
      "message": "Busqueda vacía TrackInfo: 642d238d-70a6-4e5c-b4d9-473e98b6b453",
      "correlationId": "",
      "data": {
          "error": "Búsqueda sin resultados.",
          "timestamp": "2024-11-13T00:39:31.374Z"
      }
      }`));
  }

  findUsuarioRUUsername(username: string) {
    return of(JSON.parse(`{
      "code": "200",
      "internalCode": "1000",
      "message": "Busqueda vacía TrackInfo: 642d238d-70a6-4e5c-b4d9-473e98b6b453",
      "correlationId": "",
      "data": {
          "error": "Búsqueda sin resultados.",
          "timestamp": "2024-11-13T00:39:31.374Z"
      }
      }`));
  }
  async getEscenario(rfc: string, valorFirmado: string): Promise<unknown> {
        return  new Promise<unknown>((resolve, reject) =>
          {
                resolve(JSON.parse( `{
                "code": "200",
                "message": "Consulta Exitosa",
                "internalCode": "0000",
                "data": {
                    "username": null,
                    "persona": null,
                    "modificable": true,
                    "tipo": "N"
                },
                "correlationId": ""
            }`));
          });
  }

  async validarInformacionCuenta(
    cer: string,
    key: string,
    contrasenia_certificado: string,
    rfc: string,
  ): Promise<unknown> {
    try {
      const request = {
        cer,
        key,
        contrasenia_certificado,
        rfc,
      };
      return await new Promise((resolve, reject) => {
        const observer = this.http
          .post<unknown>(`${environment.API_URL}/recuperar-cuenta`, request)
          .subscribe({
            next: (resp) => {
              resolve(resp);
              observer.unsubscribe();
            },
            error: (error) => {
              reject(error);
              observer.unsubscribe();
            },
          });
      });
    } catch (error: any) {
      const message = `${error.message}, Trackinfo: '0bdb25c6-b993-5250-b630-1ac562e4b2b3'`;
      this.toastrService.error(message);
      throw new Error(message);
    }
  }
}
