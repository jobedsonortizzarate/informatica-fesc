export interface catalogo {
  id: number;
  nombre: string;
  estatus: number;
}

export interface respuestaCatalogos {
  code: string;
  correlationId: string;
  data: catalogo[];
  internalCode: string;
  message: string;
}

export interface respuestaCodigoPostal {
  code: string;
  correlationId: string;
  data: codigoPostal;
  internalCode: string;
  message: string;
}

export interface codigoPostal {
  municipio: string;
  estado: string;
  asentamientos: colonia[];
  codigoPostal: string;
  idEstado: number;
  idMunicipio: number;
}

export interface colonia {
  asentamiento: string;
  estatus: string;
  idCp: number;
  tipoAsentamiento: string;
}
