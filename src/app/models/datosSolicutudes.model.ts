export interface listaSolicitudes {
  totalCount: number;

  dias_faltantes_sol: string | null;
  dias_faltantes_indep: string | null;
  tx_fecha_atencion: string;
  tx_diasatencion: number | null;
  fh_correc_poliza: Date | null;
  fh_firma_nom: Date | null;
  fh_ultimo_reg: Date | null;

  cd_solicitud: string;
  nu_anio: number;
  nu_numsol: number;
  tx_turno: string;
  tx_numoficio: string;
  tx_reginst: string;
  tx_folio: string;
  tx_observaciones: string;
  fh_registro: string;
  cd_biensusep: number;
  nu_valortrans: string;
  nu_refbanc: string;
  cd_tipobien: number;
  tipobien: string;
  cd_estatusatdb: number;
  estatus: string;

  tx_obsmensaje: string;
  st_interno: number;
  tx_desexterno: string;

  cd_estatusdg: number;
  estatusDG: string;
  cd_viasol: number;
  viaSolicitud: string;
  cd_remitente: number;
  remitente: string;

  tx_pregopijuri: string | null;
  st_opijuri: string | null;
  tx_repopijuri: string | null;

  cd_lugar_sol: number;
  lugar_sol: string;
  cd_colonia: number;
  tx_colonia: string;
  tx_codipostal: string;
  cd_municipio: number;
  tx_municipio: string;
  cd_lugar_bien: number;
  lugar_bien: string;
  cd_garantia: number;
  garantia: string;

  tx_descbien: string;
  tx_justbien: string;
  st_gasto: number;
  st_poliza: number;
  st_informe: number;
  st_devolver: number;
  nu_propuesta: string;
  tx_intjuridico: string | null;

  cd_persona: number;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  cd_usuario: number;

  validacion: boolean;
  tx_obsrevreq: string | null;
  fh_revreq: string | null;
  st_revreq: number | null;

  tx_obsprobien: string | null;
  fh_probien: string | null;
  st_probien: number | null;

  tx_obsselbien: string | null;
  fh_selbien: string | null;
  st_selbien: number | null;

  tx_ofrechazo: string | null;
  tx_obsofatnrech: string | null;
  fh_ofrech: string | null;

  opinion_tecnica: boolean;

  tx_ofsoloptec: string | null;
  fh_ofsoloptec: string | null;

  oficio_ot: string | null;
  fh_recoptec_ot: string | null;
  bienviable_ot: number | null;
  obs_ot: string | null;

  nombramiento: boolean;
  tx_numnom: string | null;
  fh_nombramiento: string | null;

  tx_refbancaria: string | null;
  nu_cprestamen: number | null;
  fh_solautdcb: string | null;
  fh_autorizadcb: string | null;

  tx_ofnotdeporio: string | null;
  fh_oficio: string | null;
  fh_remitpol: string | null;
  tx_ofasesor: string | null;
  fh_ofasesor: string | null;

  observaciones_nom: string | null;
  tx_ofasesorresp: string | null;
  fh_ofasesorrec: string | null;

  tx_obsercotiza: string | null;
  tx_ofdr: string | null;
  fh_ofdr: string | null;

  fh_revocac: string | null;
  estatus_nom: string | null;
  st_firmable: number | null;

  entrega: boolean;
  fh_entregabien: string | null;
  fh_hora: string | null;
  tx_ofentbien: string | null;
  fh_ofentbien: string | null;
  fh_recdest: string | null;
  tx_obsdest: string | null;
  tx_obsestatdb: string | null;
  tx_responsable: string | null;

  fh_recactent: string | null;
  tx_obsactent: string | null;
  tx_respaccatdb: string | null;
  tx_acctatdb: string | null;

  cd_clasificacion: number | null;

  cd_poldeporia: number | null;
  tx_numpol: string | null;
  cd_catasegur: number | null;
  tx_catasegur: string | null;
  cd_cobertura: number | null;
  tx_cobertura: string | null;
  fh_inipol: Date | null;
  fh_finpol: Date | null;
  cd_periodicidad: number | null;
  tx_periodicidad: string | null;
  tx_sumaseg: string | null;
  st_compropago: string | null;
  st_claunocan: string | null;
  st_benifindep: string | null;
  cd_archsol: number | null;
  cd_archsolgar: number | null;

  tx_biendesc: string | null;
  tx_observacionesBien: string | null;
  tx_ubicacion: string | null;
}

export interface filtrosSolicitud {
  cd_solicitud: string | null;
  cd_tipobien: number | null;
  cd_estatusatdb: number | null;
  cd_estatusdg: number | null;
  cd_remitente: number | null;
  tx_folio: string;
  tx_numoficio: string;
  tx_descbien: string;
  fh_registro_desde: string;
  fh_registro_hasta: string;
  cd_persona: number | null;
  tx_nomrazsocial: string;
  cd_usuario: number | null;
  cd_viasol: number | null;
  page: number;
  pageSize: number;
}

export interface crearRepresentante {
  id: number | null | undefined;
  curp: string;
  rfc: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  correo_electronico: string;
  telefono_fijo: number;
  telefono_movil: number;
  pais: number;
  id_estado: number;
  cd_catpersona: number;
}

export interface datosEmitter {
  solicitud: string;
  avaanzar: boolean;
}

export interface avanzarEtapa {
  etapa1: true;
  etapa2: true;
  etapa3: true;
  etapa4: true;
  etapa5: true;
  etapa6: true;
}

export interface datosSolicitud {
  actualizacion: boolean;
  id_solicitud: string | null;
  num_reg_inst: string;
  tipo_bien: number;
  cp_dom: number;
  colonia: number;
  tx_colonia: string;
  descripcion_bien: string;
  justificacion_bien: string;
  acepta: boolean;
  propuesta: string;
  tipo_garantia: number;
  id_persona: number;
  lugar_solicitud: number;
  remitente: number;
  tipo_persona: number;

  st_gasto: number | null;
  st_poliza: number | null;
  st_informe: number | null;
  st_devolver: number | null;
}

export interface datosSociosSolicitud {
  solicitud: string;
  usuario: string;
  tipo_persona: number;
  remitente: number;
  socios: DatosSocios;
}

export interface DatosContactoSol {
  solicitud: string;
  usuario: string;
  tipo_persona: number;
  remitente: number;
  id_persona: number;
  actualizar: boolean;
  contacto: {
    ext: string | null;
    telefono_fijo: string | null;
    lada: string;
    telefono_movil: string | null;
    correo: string | null;
  };
}

export interface DatosContactoBusqueda {
  solicitud: string | null;
  id_persona: number;
}

export interface DatosDomicilios {
  solicitud: string;
  usuario: string;
  tipo_persona: number;
  remitente: number;
  representante: boolean;
  id_persona: number;
  actualizar: boolean;
  int_juridico: string | null;
  datos_representante: {
    esExtranjero: boolean;
    curp: string;
    rfc: string;
    cargo: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: string;
    correo: string;
    estado: number;
    pais: number;

    ext: string;
    telefono_fijo: string;
    lada: string;
    telefono_movil: string;
    domicilios: {
      dom_fiscal: DatosDomicilio;
      dom_particular: DatosDomicilio;
    };
  };
  dom_fiscal: DatosDomicilio;
  dom_particular: DatosDomicilio;
}

export interface DatosDomicilio {
  id_estado: number;
  id_municipio: string;
  id_colonia: number;
  colonia: string;
  calle: string;
  num_int: string;
  num_ext: string;
  entreCalles: string;
}

export interface DatosSolicitante {
  tx_curp: string;
  tx_rfc: string;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  fh_naciconst: Date;
  cd_estado: number;
  cd_pais: number;
  tx_cargoprofes: string;
  tx_cargoprofes_rep: string;
  tx_lada: string;
  tx_telefono: string;
  tx_extension: string;
  tx_movil: string;
  tx_correo: string;
}

export interface DatosSociosDetalle {
  cd_datpersol: number | null;
  cd_persona: number | null;
  tx_curp: string;
  tx_rfc: string;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  fh_naciconst: string;
  cd_estado: number;
  cd_pais: number;
  st_nacional: string;

  estado_nacimiento: string;
  pais: string;

  cd_dompersona: number | null;
  cd_cp: number;
  id_estado: number;
  id_municipio: number;
  id_colonia: number;
  colonia: string;
  tx_municipio: string;
  tx_entidadfederativa: string;

  tx_calle: string;
  tx_entrecalles: string;
  tx_numext: string;
  tx_numint: string;
}

export interface DatosSocios {
  cd_datpersol: number | null;
  cd_persona: number | null;
  tx_curp: string;
  tx_rfc: string;
  tx_nomrazsocial: string;
  tx_perapellido: string;
  tx_sdoapellido: string;
  fh_naciconst: string;
  cd_estado: number;
  cd_pais: number;
  st_nacional: string;

  estado_nacimiento: string;
  pais: string;

  cd_dompersona: number | null;
  cd_cp: number;
  id_estado: number;
  id_municipio: number;
  id_colonia: number;
  colonia: string;
  tx_municipio: string;
  tx_entidadfederativa: string;

  tx_calle: string;
  tx_entrecalles: string;
  tx_numext: string;
  tx_numint: string;
}

export interface solicitarArchivos {
  seccion: number;
  id_solicitud: string;
}

export interface Documento {
  cargado: number;
  catDocto: number;
  txCdDocto: string;
  tipoArchivo: string[];
}

export interface Persona {
  catSubsecarch: number;
  txCdSubsecarch: string;
  cdPersona: number;
  nombrePersona: string;
  documentos: Documento[];
  mostrar: boolean | null;
}

export interface ConsultaDocumentosResponse {
  code: string;
  message: string;
  data: Persona[];
  internalCode: string;
  correlationId: string;
}

export interface cargaArchivo {
  idArchivoSubSeccion: number;
  idSolicitud: string;
  idPersona: number;
  ubicacionArchivo: string;
  extensionArchivo: string;
}

export interface BorrarPersonaSolRequest {
  solicitud: string | null;
  id_persona: number | null;
}
