export const CONSTANTES = {
  EXP_CORREO: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
  EXP_TEXTO_GENERAL: /^[^<>$]*$/,
  EXP_TELEFONO: /^\d{8,13}$/,
  EXP_TELEFONO_O_VACIO: /^(?:\d{8,13}|)$/,
  EXP_NUMEROS: /^[0-9]+$/,
  EXP_NUMEROS_PUNTO: /^[0-9]+(\.[0-9]+)?$/,
  EXP_NUMEROS_O_VACIO: /^$|^\d+$/,
  EXP_LADA_NUMEROS_O_VACIO: /^(?:\d{2,3}|)$/,
  EXP_EXT_NUMEROS_O_VACIO: /^(?:\d{2,8}|)$/,
  EXP_NUM_EXT_O_VACIO: /^.{0,10}$/,
  EXP_NUM_INT_O_VACIO: /^.{0,10}$/,
  EXP_CURP: /^[A-Z]{4}\d{6}[H,M][A-Z]{5}[0-9,A-Z]\d$/,
  EXP_RFC:
    /^[A-ZÑ&]{3,4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}[A\d]$/,
  EXP_RFC_FISICA: /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/,
  EXP_CONTRA: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/,
  EXP_CODIGO_POSTAL: /^\d{5}$|^$/,
  EXP_LADA_EXTENCION: /^(\d{3,6})?$/,
  EXP_USUARIO: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
  EXP_NUMEROS_DECIMALES: /^\s*-?\d+(\.\d{1,2})?\s*$/,
};

export const INDICES = {
  INDICE_DOC: 0,
  INDICE_SUB: 0,
};

export const ESTATUS_PAGOS = {
  REGISTRO: 1,
  ENVIADO_RE: 2,
  VALIDADO: 3,
  RECHAZADO: 4,
};

export const TIPO_INFORME = {
  INFORME_MENSUAL: 1,
  MTO_CUENTA_RENTA: 2,
  DEVOLUCION_BIEN: 3,
  SINIESTRO: 4,
  OTRO: 5,
};

export const SECCIONES = {
  SECCION_UNO: 1,
  SECCION_CUATRO: 4,
  SECCION_ONCE: 11,
};

export const ARCH_SUBSECCION = {
  ARCH_SUBSECCION_POLIZA: 5100007,
  ARCH_SUBSECCION_GARANTIA: 5100012,
};

export const ESTATUS_EDICION = {
  SELECCION_BIEN: 12,
};

export const VIASOL = {
  INTERNET: 2,
};

export const ROL = {
  AGENTE_SEGURO: 'Agente seguros',
};

export const ROL_ESTATUS = {
  ESTATUS_AGENTE_SEGURO: 816,
};

export const ARCHIVOS = {
  CD_DOC: 13,
  CD_DOC23: 23,
};

export const COOKIE = {
  NOMBRE_COOKIE_TOKEN: 'sg-token-ext',
  NOMBRE_COOKIE_TOKEN_REFRESH: 'sg-token-refresh-ext',
  NOMBRE_COOKIE_USUARIO: 'sg-usuario-ext',
  NOMBRE_COOKIE_ROL: 'sg-rol-ext',
};

export const INTERNAL_CODES = {
  INTERNAL_CODE_SUCCESS: '0000',
  SUCCESSFUL: '200',
  EMPTY_RESULT: '204',
  NO_CODE: '5000',
  VALIDATION_ERROR_CODE: '1000',
  TOKEN_VALIDATION_ERROR_CODE: 'JWT00',
  UNKNOWN_ERROR_CODE: '9000',
  ERROR_CODE: '9001',
  INVALID_CODE: '417',
  RENOVACION_TOKEN: '601',
  TOKEN_VALIDO: '401',
};

export const ESTATUS = {
  REGISTRO: 101,
  SOL_RECHAZADA: 102,

  FIRMA_NOMBRAMIENTO: 873,
};

export const PAGINACION = {
  page: 1,
  pageSize: 10,
};

export const TIPO_PERSONA = {
  PERSONA_FISICA: 1,
  PERSONA_MORAL: 2,
};

export const TIPO_REMITENTE = {
  APF: 1,
  ENTIDAD_ESTATAL: 2,
  ENTIDAD_MUNICIPAL: 3,
  INDEP: 4,
  MORAL: 5,
  FISICA: 6,
  MORAL_EXTRANJERO: 7,
  FISICA_EXTRANJERO: 8,
};

export const TIPO_CLASI_NOMBRAMIENTO = {
  COMODATO: 1,
  GRATUITA: 2,
  PRODUCTIVA: 3,
};

export const TIPO_BIEN = {
  OTROS: 1,
  BLINDADOS: 2,
  INMUEBLES: 6,
  MUEBLES: 5,
};

export const DOCUMENTOS_FILTRO = {
  NOM_COMODATO: 118,
  NOM_PROD: 112,
  NOM_GARANTIA: 126,
  NOM_BLINDADO: 117,
  NOM_UTIL_INDEP: 121,
};

export const TIPO_SOLICITANTE = {
  SOCIO: 1,
  SOLICITANTE: 2,
  REPRESENTANTE: 3,
};

export const PLANTILLAS = {
  OTS: 'OTS',
  OTA: 'OTA',
  OTR: 'OTR',
};

export const PAIS = {
  MEXICO: 169,
};

export const ID_ESTADOS = [
  {
    id_estado: '05',
    value: 7,
  },
  {
    id_estado: '06',
    value: 8,
  },
  {
    id_estado: '07',
    value: 5,
  },
  {
    id_estado: '08',
    value: 6,
  },
];

export const TIPO_USUARIO = {
  SOLICITANTE: 1,
  AGENTE: 2,
};

export const POLIZAS = {
  ESTATUS_REGISTRO: 1,
  ESTATUS_VALIDACION: 2,
  ESTATUS_RECHAZO_INDEP: 3,
  ESTATUS_VENCIADA: 5,
  ESTATUS_VIGENTE: 6,
};

export const ID_COBETURAS = {
  OTRO: 0,
};

export const ID_ASEGURADORAS = {
  OTRO: 0,
};

export const TIPO_NOTIFICACION = {
  ENTREGA: 1,
  REMOCION: 2,
};

export const CONFIGURACION = {
  CUENTA_SINIESTRO: 'SIDEP_PAGOS_SINIESTRO_CUENTA_BANCO',
};

export const FILTRO_DOCUMENTOS =
  'archivo-solicitud/all?filters[0][property]=cd_solicitud&filters[0][comparison]=EQUAL&filters[0][value]=';

export const ESTATUS_CURP_INVALIDO = 'BD';

export const MESES = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export const ANIO = 2012;

export const SINIESTRO: number = 11;
export const DEVOLUCION: number = 12;
export const CONTRAPRESTACION: number = 5;

export const PROCESO = [
  { key: 'Solicitudes', value: 1 },
  {
    key: 'Depositarías',
    value: 2,
  },
];

export const LISTANOMBRAMIENTOS = [800, 801, 802, 803, 804, 805, 806];
