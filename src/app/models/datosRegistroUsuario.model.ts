export interface usuarioRegistro {
  uuid: string | null;
  tipo_usuario: number;
  nombre_razon_social: string;
  primer_apellido: string | null;
  segundo_apellido: string | null;
  rfc: string;
  curp: string | null;
  correo: string;
  fecha_nacimiento: string | null;
  usuario: string;
  contrasenia: string;
  id_estado: number | null;
  id_pais: number;
  id_remitente: number | null;
  es_extranjero: boolean;
  con_certificado: boolean;
  sexo: string | null;
  id_solicitante: number;
  id_reg_unico: number | null;
  id_tipo_rol: number;
  cargo_profesion: string | null;
  strCer?: string | null;
  strKey?: string | null;
  strClave?: string | null;
}
