export interface DatosSesion {
  id_usuario: string;
  tipo_usuario: number | null;
  tipo_remitente: number | null;
  extranjero: boolean;
  nombre_usuario: string | null;
  nombre: string | null;
  rol: string | null;
  menu: menu[];
  id_persona: number | null;
  token: {
    access_token: string | null;
    refresh_token: string | null;
    tiempo: string | null;
  };
}

export interface menu {
  nombre: string;
  direccion: string;
  permisos: permisos[];
  subMenu?: subMenu[];
}

export interface subMenu {
  nombre: string;
  direccion: string;
  permisos: permisos[];
}

export interface permisos {
  consulta: boolean;
  alta: boolean;
  baja: boolean;
  cambios: boolean;
  reportes: boolean;
}
