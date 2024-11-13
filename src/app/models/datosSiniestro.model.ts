export interface DatosSiniestro {
  cd_solicitud: string;
  fh_regsol: Date;
  nu_propindemn: number;
  tx_obsersinie: string;
  fh_envioas: string | null;
  tx_obsenvioas: string | null;
}

export interface DatosSiniestroGen {
  cd_solicitud: string;
  fh_regsol: string;
  nu_propindemn: number;
  tx_obsersinie: string;
  tx_folioremoc: string;
  fh_regpago: Date;
  tx_obsenvioas: string;
  fh_envioas: Date;
  tx_notificacion2sol: string;
  fh_notificacion2sol: Date;
  tx_notificacion3sol: string;
  fh_notificacion3sol: Date;
  tx_notificacion4sol: string;
  fh_notificacion4sol: Date;
  tx_obsfirmaacta: string;
  fh_firmaacta: Date;
  fh_cuentabanc: Date;
  tx_cuentabanc: string;
  tx_obscuentabanc: string;
  fh_firmaoficio: Date;
  tx_obsfirmaoficio: string;
  nu_indemnaseseg: number;
  fh_regaseseg: Date;
  tx_obseraseseg: string;
}

export interface DatosSiniestroCAB {
  cd_solicitud: string;
  fh_regaseseg: Date;
  nu_indemnaseseg: number;
  tx_obseraseseg: string;
  tx_cuentabanc: string;
}

export interface DatosSiniestroEnviarCAP {
  cd_solicitud: string;
  nu_indemnaseseg: number;
  fh_regaseseg: Date;
  tx_obseraseseg: string;
}

export interface DatosSiniestroEnviarPagoINDEP {
  cd_solicitud: string;
  fh_regpago: Date;
  tx_obserpago: string;
}

export interface DatosSiniestroEnviarAs {
  cd_solicitud: string;
  tx_obsenvioas: string;
  fh_envioas: Date;
}

export interface InsertSolicitudRequest {
  cd_solicitud: string;
}

export interface InsertSiniestroRequest {
  cd_siniestro: string;
}

export interface RequestUpdateSiniestro {
  idArchivoSubseccion: number;
  idSolicitud: string;
  idPersona: number;
  anno: number;
  mes: number;
  datos_siniestro: DatosSiniestroEnviarPagoINDEP;
  extensionArchivo: string;
  file: string | ArrayBuffer | null;
  cd_siniestro: number;
}
