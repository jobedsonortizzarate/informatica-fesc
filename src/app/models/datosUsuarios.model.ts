export interface datosUsuarios {
  id: number;
  nombre: string;
  primerApellidop: string;
  segundoApellido: string;
  esEmpleado?: boolean;
  correo: string;
  curp: string;
  rfc: string;
  telefono: number;

  noPage: number;
  totalPages: number;
  totalRows: number;
  noReg: number;
}

export interface datosLogin {
  usuario: string;
  password: string;
}

export interface datosRecuperaSesion {
  username: string;
  refresh_token: string;
}

export interface datosRecuperaUsuario {
  uuid: string;
  correo_nuevo: string;
  cer: string;
  key: string;
  contrasenia_certificado: string;
}

export interface DatosCuentaRecuperada {
  cer: string;
  key: string;
  password: string;
  RFC_Usuario: string;
  contrasenia_nueva: string;
  correo_nuevo: string;
  usuario: string;
  correo_anterior: string;
}

export interface datosContrasenaRecuperada {
  uuid: string;
  contrasenia: string;
  correo: string;
}

export interface datosUsuarioRU {
  username: string;
  password: string;
  rfc?: string;
}
