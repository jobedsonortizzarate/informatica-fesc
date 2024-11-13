export interface respuestDatosServicios {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: DatosServicios[];
}

export interface respuestCreaDetallePagoServicios {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: boolean;
}

export interface RespuestaFechaRegistro {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: FechaRegistro;
}

export interface respuestaServicios {
  cd_compago: number;
  idSolicitud: string;
}

export interface respuestaTiposServicios {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: TiposServicios[];
}

export interface respuestaServiciosSolicitud {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: ServiciosSolicitud[];
}

export interface RequestGuardarDetpago {
  idArchivoSubseccion: number;
  idSolicitud: string;
  idPersona: number;
  anno: number;
  mes: number;
  datos_detpago: DetallePago;
  extensionArchivo: string;
  file: string | ArrayBuffer | null;
}

export interface RequestUpdateDetpago {
  idArchivoSubseccion: number;
  idSolicitud: string;
  idPersona: number;
  anno: number;
  mes: number;
  datos_detpago: UpdateDetPago;
  extensionArchivo: string;
  file: string | ArrayBuffer | null;
}

export interface DetallePago {
  cd_solicitud: string;
  tx_anio: string;
  cd_detpago: number | null;
  cd_periodicidad: number | null;
  cd_estpago: number | null;
  tx_obserdetpag: string | null;
  cd_obligac: number;
  tx_campo: string;
  cd_detoblig: number | null;
}

export interface UpdateDetPago {
  cd_estpago: number | null;
  cd_detpago: number | null;
  cd_archsol: number | null;
  tx_obserdetpag: string | null;
}

export interface DeleteDetPagoRequest {
  cd_detoblig: string;
  cd_detpago?: number;
  cd_informemen?: number;
  cd_obligac: number;
  tx_campo: string;
  cd_archsol: number;
}

export interface UpdateEstatusRequest {
  cd_obligac?: number;
  cd_detpago?: number;
  cd_estpago?: number;
  cd_informemen?: number;
  cd_estinfmen?: number;
  tx_campomes?: string;
  ct_validado?: number | null;
}

export interface DatosServicios {
  cd_solicitud: string;
  cd_compago: number | null;
  tx_anio: string;
  cd_tiposerv: number | null;
  tipoServicio: string;
  ct_totalmes: string | null;
  ct_mes1: string | null;
  detallePago: string | null;
  cd_detpago: number | null;
  cd_periodicidad: number | null;
  tx_periodicidad: string | null;
  nu_registros: string | null;
  cd_estpago: number | null;
  tx_estatus_pago: string | null;
  tx_obserdetpag: string | null;
  cd_pericap: number | null;
  tx_campo: string | null;
}

export interface listaServicios {
  cd_solicitud: string;
  cd_detpago: number;
  unpivot_anio: string;
  servicio: string | null;
  periodicidad: string | null;
  unpivot_tx_descripcion: string | null;
  cd_compago: number;
}

export interface filtrosServicios {
  cd_solicitud: string;
  nu_anio: string;
  cd_servicio: number;
}

export interface LineaCapturaRequest {
  cd_solicitud: string | null;
  nu_anio: number | null;
  nu_mes: number | null;
  cd_tiposerv: number | null;
}

export interface ComapgoRequest {
  tx_campo: string | null;
  unpivot_tx_descrition: string;
}

export interface InformeDepositaria {
  cd_solicitud: string;
  cd_tiponom: number;
  cd_deporia: number;
  cd_clasificacion: number;
  nu_conpresmes: number;
  nu_mesesatrasado: number;
  nu_montoadeudo: number;
  tx_concepadeudo: string;
  cd_poldeporia: number;
  tx_anio: string;
  cd_tiposer: string;

  cd_detpago: number;
  cd_periodicidad: number;
  cd_estpago: number;
  tx_obserdetpag: string;
}

export interface serviciosListaOTRequest {
  id_solicitud: string;
  seccion?: number;
}

export interface ActualizaServicios {
  unpivot_anio: string | null;
  unpivot_periodo: string | null;
  unpivot_tx_descripcion: string | null;
  tx_obserdetpag: string | null;
  cd_detpago: number | null;
  cd_estpago: number | null;
  tx_campo: string | null;
}

export interface TiposServicios {
  cd_tiposerv: number | null;
  tx_descripcion: string | null;
  cd_periodicidad: number | null;
  cd_archsubsec: number | null;
  st_tiposerv: number | null;
}

export interface ServiciosSolicitud {
  cd_solserv: number | null;
  cd_tiposerv: number | null;
  st_tiposerv: number | null;
  cd_solicitud: string | null;
  cd_periodicidad: number | null;
}

export interface DatosServiciosInterno {
  cd_tiposerv: number;
  descperidodisidad: string | null;
  desctiposerv: string | null;
  st_tiposerv: number | null;
  cd_archsubsec: number | null;
  cd_periodicidad: number;
  cd_solserv: number;
  cd_solicitud: string;
  tx_observaciones: string | null;
  adeudos: string;
  ct_totalmes: number;
  tx_anio: string | null;
}

export interface InsertSolServRequest {
  cd_solicitud: string | null;
}

export interface FechaRegistro {
  fechaRegistroPadron: Date;
}

export interface AdeudosRequest {
  solicitud: string;
}

export interface AdeudosResponse {
  code: string;
  correlationId: string;
  internalCode: string;
  message: string;
  data: AdeudosServicio[];
}

export interface AdeudosServicio {
  adeudos: string;
  cd_solserv: number;
  cd_tiposerv: number;
  desctiposerv: string;
  anio: AdeudosPorAnio[];
}

export interface AdeudosPorAnio {
  anio: any | null;
  adeudoMes: Array<string>;
}
