import { DatosSiniestroGen } from './datosSiniestro.model';
import { DatosServiciosInterno } from './datosServicios.model';
import { DatosSesion } from './datosSesion.model';
import {
  DatosSocios,
  DatosSolicitante,
  listaSolicitudes,
} from './datosSolicutudes.model';

export interface respuesta {
  code: string;
  correlationId: string;
  data: [];
  internalCode: string;
  message: string;
}

export interface respuesta {
  code: string;
  correlationId: string;
  data: [];
  internalCode: string;
  message: string;
}

export interface respuestaBoolean {
  code: string;
  correlationId: string;
  data: boolean;
  internalCode: string;
  message: string;
}

export interface respuestaRegSolicitud {
  code: string;
  correlationId: string;
  data: string;
  internalCode: string;
  message: string;
}
export interface respuestaCurp {
  code: string;
  correlationId: string;
  data: {
    CURP: string;
    apellido1: string;
    apellido2: string;
    nombres: string;
    sexo: string;
    fechNac: string;
    nacionalidad: string;
    docProbatorio: string;
    anioReg: string;
    numActa: string;
    numEntidadReg: string;
    cveMunicipioReg: string;
    NumRegExtranjeros: string;
    cveEntidadNac: string;
    statusCurp: string;
  };
  internalCode: string;
  message: string;
}
export interface respuestaLogin {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: DatosSesion;
}
export interface respuestaListaSolicitudes {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: listaSolicitudes[];
}

export interface respuestaDatosGenerales {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: any;
}

export interface DatosRegistroUnico {
  id: string;
  curp: string;
  accountExpired: boolean;
  accountLocked: boolean;
  aceptoAviso: boolean;
  aceptoNoArt32: boolean;
  aceptoTerminos: boolean;
  apellidoPaterno: string;
  apellidoMaterno: string;
  archivoFoto: string;
  banco: string;
  calle: string;
  clabe: string;
  codigo: string;
  codigoPostal: string;
  colonia: string;
  comentariosEstatus: string;
  correo: string;
  cuentaCheques: string;
  dateCreated: Date;
  enable: boolean;
  estado: string;
  estatusCliente: number;
  idAutor: number;
  lastUpdate: Date;
  municipio: string;
  nombre: string;
  pais: string;
  password: string;
  passwordExpired: boolean;
  razonSocial: string;
  rfc: string;
  rfcRepresentante: string;
  sesionActiva: boolean;
  sessionId: string;
  sucursal: string;
  telefono: string;
  tipoPersona: number;
  totalVisitas: number;
  userName: string;
  regimenFiscal: string;
}

export interface respuestaDatosSolicitante {
  code: string;
  correlationId: string;
  data: DatosSolicitante;
  internalCode: string;
  message: string;
}

export interface respuestaSolicitud {
  code: string;
  correlationId: string;
  data: solicitud;
  internalCode: string;
  message: string;
}

export interface solicitud {
  cd_cp: number | null;
  cd_estado: number | null;
  cd_estatusatdb: number | null;
  cd_garantia: number | null;
  cd_solicitud: string | null;
  cd_tipobien: number | null;
  tx_tipobien: string | null;
  cd_viasol: number | null;
  fh_registro: string | null;
  st_acepto: string | null;
  tx_colonia: string | null;
  tx_descbien: string | null;
  tx_folio: string | null;
  tx_justbien: string | null;
  tx_propuesta: string | null;
  tx_reginst: string | null;
  tx_intjuridico: string | null;
  tx_numoficio: string | null;
  cd_biensusep: number | null;

  st_gasto: number | null;
  st_poliza: number | null;
  st_informe: number | null;
  st_devolver: number | null;
}

export interface respuestaDomicilios {
  code: string;
  correlationId: string;
  data: Domicilios;
  internalCode: string;
  message: string;
}

export interface Domicilios {
  solicitante: {
    particular: DomicilioView;
    fiscal: DomicilioView;
  };
  representante: {
    particular: DomicilioView | null;
    fiscal: DomicilioView | null;
  };
}

export interface DomicilioView {
  cd_domicilio: number;
  cd_cp: number;
  cd_estado: number;
  tx_calle: string;
  cd_colonia: string;
  tx_colonia: string;
  tx_numext: string;
  tx_numint: string;
  tx_entrecalles: string;
  tx_mnpio: string;
}

export interface respuestaListaSocios {
  code: string;
  correlationId: string;
  data: DatosSocios[];
  internalCode: string;
  message: string;
}

export interface respuestaIdSolicitud {
  code: string;
  correlationId: string;
  data: string;
  internalCode: string;
  message: string;
}

export interface respuestaDetalleSolicitudes {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: SolicitudDetalle;
}

export interface SolicitudDetalle {
  cd_solicitud: string;
  tx_folio: string;
  tx_descbien: string;
  fh_registro: string;
  cd_remitente: number;
  tx_remitente: string;
  nu_propuesta: number;
  tx_justbien: string;
  tx_intjuridico: string | null;
  tx_reginst: string;
  cd_estatusatdb: number;
  estatus: string;
  cd_tipobien: string;
  tipobien: string;
  ts_nu_anio: number;
  ts_nu_numsol: number;
  ts_tx_turno: number;
  ts_tx_numoficio: string;
  tx_viasol: string;
  tx_observaciones?: string;

  cd_persona: number;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  cd_usuario: number;

  tx_curp: string | null;
  tx_rfc: string;
  fh_naciconst: string;
  estado_solicitante: string;
  pais_solicitante: string | null;

  cd_lugar_solicitud: number;
  lugar_solicitud: string;
  codigo_postal: string;
  estado_bien: string;
  municipio_bien: string;
  colonia_bien: string;

  st_nacional: string;

  st_gasto: string;
  st_poliza: string;
  st_informe: string;
  st_devolver: string;

  garantia: string;
  st_donativo: boolean;

  tx_lada: string;
  tx_extension: string;
  tx_telefono: string;
  tx_movil: string;
  tx_correo: string;

  dom_part: Domicilio | null;
  dom_fis: Domicilio | null;

  representante: boolean;
  representante_datos: DatosPersona | null;
  rep_dom_part: Domicilio | null;
  rep_dom_fis: Domicilio | null;

  socios: DatosSocios[];
}

export interface DatosPersona {
  tx_curp: string;
  tx_rfc: string;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  fh_naciconst: string;
  cd_estado: number;
  cd_pais: number;
  estado: string;
  pais: string;
  st_nacional: string;

  tx_lada: string;
  tx_telefono: string;
  tx_extension: string;
  tx_movil: string;
  tx_correo: string;
}

export interface Domicilio {
  cd_domicilio: number;
  cd_cp: number;
  cd_estado: number;
  tx_calle: string;
  cd_colonia: number;
  tx_colonia: string;
  tx_numext: string;
  tx_numint: string;
  tx_entrecalles: string;
  tx_mnpio: string;
  tx_municipio: string;
  tx_entidadfederativa: string;
}

export interface respuestaServicio {
  code: string;
  correlationId: string;
  data: DatosServiciosInterno[];
  internalCode: string;
  message: string;
}

export interface respuestaSiniestro {
  code: string;
  correlationId: string;
  data: DatosSiniestroGen[];
  internalCode: string;
  message: string;
}
