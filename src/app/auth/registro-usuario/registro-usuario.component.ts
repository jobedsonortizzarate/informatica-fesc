import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catalogo } from '../../models/catalogos/datosCatalogos.model'
import { DatosRetornoWizard } from '../../models/datosRetornoWizard.model';
import { ConfirmarModalService } from '../../services/confirmar-modal/confirmar-modal.service';
import {
  CONSTANTES,
  INTERNAL_CODES,
  PAIS,
  TIPO_PERSONA,
  TIPO_REMITENTE,
  TIPO_SOLICITANTE,
} from '../../shared/constantes/constantes';
import { PasswordValidation } from '../../shared/validaciones/contrasena-validacion';
import { WizardComponent } from '../../shared/wizard/wizard.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { datosCurp }  from '../../models/datosValidaciones.model';
import { usuarioRegistro } from '../../models/datosRegistroUsuario.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CambioEntidadService } from '../../services/cambio-entidad/cambio-entidad.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { datosUsuarioRU } from '../../models/datosUsuarios.model';
import { EstadosService } from '../../services/peticiones-micro-servicios/catalogos/estados.service';
import { PaisService } from '../../services/peticiones-micro-servicios/catalogos/pais.service';
import { RemitenteService } from 'src/app/services/peticiones-micro-servicios/catalogos/remitente.service';
import { UsuarioService } from 'src/app/services/peticiones-micro-servicios/validaciones/usuario.service';
import { DatosRegistroUnico } from 'src/app/models/datosRespuestaGen.model';
import { forkJoin } from 'rxjs';
import { EscenarioRegistro } from 'src/app/models/escenarioRegistroUsuario.model';
import { BaseResponse } from 'src/app/models/base-response';

@Component({
  selector: 'sg-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent
  extends SpinnerComponent
  implements OnInit
{
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  Indice: number;
  IndiceMax: number;
  listaPasos: string[];
  habilitaLogin: boolean = false;
  recuperarContrasenia: boolean = false;
  mostrarCuenta: boolean = false;
  rfcCapturado: string = '';

  tipoPersonaFisica: number = TIPO_PERSONA.PERSONA_FISICA;
  tipoPersonaMoral: number = TIPO_PERSONA.PERSONA_MORAL;

  FormularioFirmaElectronica!: FormGroup;
  FormularioConfirma!: FormGroup;
  FormularioSinFirma!: FormGroup;
  FormularioEsNacional!: FormGroup;
  FormularioDatosGeneralesNacional!: FormGroup;
  FormularioDatosGeneralesExtrangero!: FormGroup;
  FormularioDatosGeneralesMoral!: FormGroup;
  FormularioCuenta!: FormGroup;
  LoginForm!: FormGroup;
  inicioSesion: boolean = false;
  fechanacimiento: string = '';
  uuidLogin: string | null = '';
  tipoPersona: number = -1;

  tipoUsuario: number = -1;

  listaEstados: catalogo[] = [];
  listaPaises: catalogo[] = [];
  listaRemitentes: catalogo[] = [];
  listaRemitentesFirmaMN: catalogo[] = [];
  listaRemitentesFirmaME: catalogo[] = [];

  contra1: boolean = false;
  contra2: boolean = false;

  iframeUrl: string = environment.URL_CERTIFICADOS;
  safeURL: SafeResourceUrl = '';

  datosRegistro!: usuarioRegistro;
  selectedDate!: NgbDateStruct;

  sexo: string = '';

  eventMessageController: any;

  efirmaError: any;
  efirmaWasClick = false;

  escenario: EscenarioRegistro | null = null;

  direccion = 1;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private estadosService: EstadosService,
    private paisService: PaisService,
    private remitenteService: RemitenteService,
    private confirmarModalService: ConfirmarModalService,
    private sanitizer: DomSanitizer,
    private usuarioService: UsuarioService,
    private cambioEntidadService: CambioEntidadService,
  ) {
    super();

    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.iframeUrl,
    );

    this.listaPasos = [
      'Valida tu RFC',
      'Datos Generales',
      'Datos de la cuenta',
      'Vista previa de registro',
    ];
    this.Indice = 0;
    this.IndiceMax = this.listaPasos.length;
    this.crearFormularioFirmaElectronica();
    this.crearFormularioConFirma();
    this.crearFormularioSinFirma();
    this.crearFormularioEsNacional();
    this.crearFormularioDatosGeneralesNacional();
    this.crearFormularioDatosGeneralesExtrangero();
    this.crearFormularioDatosGeneralesMoral();
    this.crearFormularioCuenta();
    this.createForm();

    this.obtenerEntidades();
    this.obtenerPaises();
    this.obtenerRemitente(1);
  }

  onDateSelection(date: NgbDateStruct) {
    this.selectedDate = date;
  }

  ngOnInit() {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  async receiveMessage(event: MessageEvent) {
    if (this.habilitaLogin) return;
    if (!this.efirmaWasClick) return;
    this.mostrarSpenner();
    const iframe = document.getElementById('Iframe') as HTMLIFrameElement;
    if (event.source === iframe.contentWindow) {
      if (event.data.todosLosCampos) {
        if (event.data.firmaValida) {
          clearTimeout(this.efirmaError);
          this.efirmaWasClick = false;
          this.tipoPersona =
            event.data.rfc.length == 13
              ? TIPO_PERSONA.PERSONA_FISICA
              : TIPO_PERSONA.PERSONA_MORAL;
          this.FormularioConfirma.get('key')?.setValue(event.data.key);
          this.FormularioConfirma.get('cer')?.setValue(event.data.cert);
          this.FormularioConfirma.get('contra')?.setValue(event.data.contra);
          this.FormularioConfirma.get('rfc')?.setValue(event.data.rfc);
          this.FormularioConfirma.get('firma')?.setValue(event.data.firma);
          this.FormularioConfirma.get('no_serie')?.setValue(
            event.data.no_serie,
          );
          this.FormularioDatosGeneralesMoral.controls['id_pais'].enable();
          this.FormularioDatosGeneralesMoral.get('id_pais')?.setValue(
            PAIS.MEXICO,
          );
          this.FormularioDatosGeneralesMoral.controls['id_pais'].disable();
          await this.getEscenario();
          if (this.escenario?.tipo === 'D') {
            this.cargaPersonaImportada();
          }
          this.cerrarSpenner();
          this.validaConFirma();
        } else {
          this.efirmaWasClick = false;
          clearTimeout(this.efirmaError);
          this.cerrarSpenner();
          this.toastrService.warning('La contraseña es incorrecta');
        }
      } else {
        clearTimeout(this.efirmaError);
        this.efirmaError = setTimeout(() => {
          this.efirmaWasClick = false;
          this.cerrarSpenner();
          this.toastrService.warning(
            'Formulario incorrecto: Todos los campos son obligatorios',
          );
        }, 1000);
      }
    }
  }

  validarFirmar(firmar: boolean, texto_firmar: string = '') {
    const iframe = document.getElementById('Iframe') as HTMLIFrameElement;
    const mensaje = {
      firmar: firmar,
      texto_firmar: texto_firmar,
    };
    this.efirmaWasClick = true;
    iframe.contentWindow?.postMessage(mensaje, environment.URL_CERTIFICADOS);
  }

  public get password() {
    return this.FormularioCuenta.get('contra1');
  }

  recibeIndice(valores: DatosRetornoWizard) {
    this.Indice = valores.indice;
    this.IndiceMax = valores.indiceMax;
  }

  async siguiente() {
    switch (this.Indice) {
      case 0:
        if (this.habilitaLogin) {
          if (this.LoginForm.valid) {
            this.login();
          } else {
            this.toastrService.warning(
              'Formulario incorrecto: Todos los campos son obligatorios',
            );
            Object.values(this.LoginForm.controls).forEach((control) => {
              control.markAsTouched();
            });
          }
        } else {
          if (this.FormularioFirmaElectronica.get('firma')?.value) {
            this.validarFirmar(true);
          } else {
            if (this.FormularioSinFirma.valid) {
              await this.getEscenario();
              this.tipoPersona =
                this.FormularioSinFirma.get('rfc')?.value.length == 13
                  ? TIPO_PERSONA.PERSONA_FISICA
                  : TIPO_PERSONA.PERSONA_MORAL;
              this.rfcCapturado = this.FormularioSinFirma.get('rfc')?.value;
              this.FormularioDatosGeneralesMoral.controls['id_pais'].enable();
              this.FormularioDatosGeneralesMoral.get('id_pais')?.setValue(
                PAIS.MEXICO,
              );
              this.FormularioDatosGeneralesMoral.controls['id_pais'].disable();
              this.validaSinFirma();
            } else {
              this.FormularioSinFirma.controls['rfc'].markAsTouched();
              this.toastrService.warning(
                'Formulario incorrecto: Todos los campos son obligatorios',
              );
            }
          }
        }
        break;
      case 1:
        this.mostrarSpenner();
        const esNacional = this.FormularioEsNacional.get('es_nacional')?.value;
        const validarFormulario = this.validarFormulario(1);
        if (validarFormulario) {
          if (this.tipoPersona === TIPO_PERSONA.PERSONA_FISICA) {
            this.validaCurp();
            if (esNacional) {
              this.usuarioService
                .findUsuarioCorreo(
                  this.FormularioDatosGeneralesNacional.get('correo')?.value,
                )
                .subscribe(
                  (resp) => {
                    if (
                      resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                    ) {
                      this.cerrarSpenner();
                      this.wizardComponent.siguiente();
                    } else {
                      this.cerrarSpenner();
                      this.toastrService.warning(
                        'Ya existe una cuenta registrada con ese correo en registro único.',
                      );
                      const controlNombre =
                        this.FormularioDatosGeneralesNacional.get('correo');
                      if (controlNombre) {
                        controlNombre.setErrors({ invalid: true });
                      }
                    }
                  },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  (error) => {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Ocurrio un error en el sistema',
                    );
                  },
                );
            } else {
              if (this.FormularioDatosGeneralesExtrangero.valid) {
                this.usuarioService
                  .findUsuarioCorreo(
                    this.FormularioDatosGeneralesExtrangero.get('correo')
                      ?.value,
                  )
                  .subscribe(
                    (resp) => {
                      if (
                        resp.internalCode ==
                          INTERNAL_CODES.INTERNAL_CODE_SUCCESS ||
                        this.inicioSesion === true
                      ) {
                        this.cerrarSpenner();
                        this.wizardComponent.siguiente();
                      } else {
                        this.cerrarSpenner();
                        this.toastrService.warning(
                          'Ya existe una cuenta registrada con ese correo en registro único.',
                        );
                        const controlNombre =
                          this.FormularioDatosGeneralesExtrangero.get('correo');
                        if (controlNombre) {
                          controlNombre.setErrors({ invalid: true });
                        }
                      }
                    },
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (error) => {
                      this.cerrarSpenner();
                      this.toastrService.warning(
                        'Ocurrio un error en el sistema',
                      );
                    },
                  );
              }
            }
          } else if (this.tipoPersona === TIPO_PERSONA.PERSONA_MORAL) {
            this.usuarioService
              .findUsuarioCorreo(
                this.FormularioDatosGeneralesMoral.get('correo')?.value,
              )
              .subscribe(
                (resp) => {
                  if (
                    resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS ||
                    this.inicioSesion === true
                  ) {
                    this.cerrarSpenner();
                    this.wizardComponent.siguiente();
                  } else {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Ya existe una cuenta registrada con ese correo en registro único.',
                    );
                    const controlNombre =
                      this.FormularioDatosGeneralesMoral.get('correo');
                    if (controlNombre) {
                      controlNombre.setErrors({ invalid: true });
                    }
                  }
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error) => {
                  this.cerrarSpenner();
                  this.toastrService.warning('Ocurrio un error en el sistema');
                },
              );
          }
        } else {
          this.cerrarSpenner();
        }
        break;
      case 2:
        this.mostrarSpenner();
        const validarFormularioDos = this.validarFormulario(2);
        if (this.recuperarContrasenia) {
          this.datosRegistro = {
            uuid: null,
            tipo_usuario: 0,
            nombre_razon_social: '',
            primer_apellido: null,
            segundo_apellido: null,
            rfc: '',
            curp: null,
            correo: '',
            fecha_nacimiento: null,
            usuario: '',
            contrasenia: '',
            id_estado: null,
            id_pais: PAIS.MEXICO,
            id_remitente: null,
            es_extranjero: false,
            con_certificado: false,
            sexo: this.sexo == '' ? null : this.sexo,
            id_solicitante: TIPO_SOLICITANTE.SOLICITANTE,
            id_reg_unico: null,
            id_tipo_rol: TIPO_SOLICITANTE.SOLICITANTE,
            cargo_profesion: '',
            strCer: '',
            strKey: '',
            strClave: '',
          };
          const formularioConFirma = this.FormularioConfirma.getRawValue();
          const formularioSinFirma = this.FormularioSinFirma.getRawValue();
          const formularioCuenta = this.FormularioCuenta.getRawValue();
          const formularioEsNacional = this.FormularioEsNacional.getRawValue();
          this.datosRegistro.tipo_usuario = this.tipoPersona;
          this.datosRegistro.con_certificado =
            this.FormularioFirmaElectronica.get('firma')?.value;

          this.datosRegistro.rfc = this.datosRegistro.con_certificado
            ? formularioConFirma.rfc
            : formularioSinFirma.rfc;
          this.datosRegistro.strCer =
            this.FormularioFirmaElectronica.get('cer')?.value;
          this.datosRegistro.strKey =
            this.FormularioFirmaElectronica.get('key')?.value;
          this.datosRegistro.strClave =
            this.FormularioFirmaElectronica.get('contra')?.value;

          this.datosRegistro.usuario = formularioCuenta.usuario;
          this.datosRegistro.contrasenia = formularioCuenta.contra1;
          this.datosRegistro.es_extranjero = formularioEsNacional.es_nacional
            ? false
            : true;
          if (this.tipoPersona === TIPO_PERSONA.PERSONA_MORAL) {
            const formularioMoral =
              this.FormularioDatosGeneralesMoral.getRawValue();
            this.datosRegistro.nombre_razon_social =
              formularioMoral.razon_social;
            this.datosRegistro.correo = formularioMoral.correo;
            this.datosRegistro.id_pais = Number(formularioMoral.id_pais);
            this.datosRegistro.id_remitente = Number(
              formularioMoral.id_remitente,
            );
            this.datosRegistro.id_estado = Number(formularioMoral.id_estado);
            this.datosRegistro.cargo_profesion =
              formularioMoral.cargo_profesion;
            this.datosRegistro.id_tipo_rol = TIPO_SOLICITANTE.SOLICITANTE;
          } else {
            this.datosRegistro.id_remitente = TIPO_REMITENTE.FISICA;
            if (formularioEsNacional.es_nacional) {
              const formularioDatosGeneralesNacional =
                this.FormularioDatosGeneralesNacional.getRawValue();
              this.datosRegistro.curp = formularioDatosGeneralesNacional.curp;
              this.datosRegistro.nombre_razon_social =
                formularioDatosGeneralesNacional.nombre;
              this.datosRegistro.primer_apellido =
                formularioDatosGeneralesNacional.primer_apellido;
              this.datosRegistro.segundo_apellido =
                formularioDatosGeneralesNacional.segundo_apellido;
              this.datosRegistro.fecha_nacimiento =
                formularioDatosGeneralesNacional.fecha_nacimiento;
              this.datosRegistro.correo =
                formularioDatosGeneralesNacional.correo;
              this.datosRegistro.id_estado =
                formularioDatosGeneralesNacional.id_estado;
              this.datosRegistro.cargo_profesion =
                formularioDatosGeneralesNacional.cargo_profesion;
              this.datosRegistro.id_pais = Number(
                formularioDatosGeneralesNacional.id_pais,
              );
              this.datosRegistro.id_tipo_rol = TIPO_SOLICITANTE.SOLICITANTE;
            } else {
              const formularioDatosGeneralesExtrangero =
                this.FormularioDatosGeneralesExtrangero.getRawValue();
              this.datosRegistro.nombre_razon_social =
                formularioDatosGeneralesExtrangero.nombre;
              this.datosRegistro.primer_apellido =
                formularioDatosGeneralesExtrangero.primer_apellido;
              this.datosRegistro.segundo_apellido =
                formularioDatosGeneralesExtrangero.segundo_apellido;
              this.datosRegistro.correo =
                formularioDatosGeneralesExtrangero.correo;
              this.datosRegistro.fecha_nacimiento =
                formularioDatosGeneralesExtrangero.fecha_nacimiento;
              this.datosRegistro.id_pais = Number(
                formularioDatosGeneralesExtrangero.id_pais,
              );
              this.datosRegistro.cargo_profesion =
                formularioDatosGeneralesExtrangero.cargo_profesion;
              this.datosRegistro.id_tipo_rol = TIPO_SOLICITANTE.SOLICITANTE;

              this.datosRegistro.strKey =
                this.FormularioConfirma.get('key')?.value;
              this.datosRegistro.strCer =
                this.FormularioConfirma.get('cer')?.value;
              this.datosRegistro.strClave =
                this.FormularioConfirma.get('contra')?.value;
            }
          }
          this.wizardComponent.siguiente();
          this.cerrarSpenner();
        } else {
          if (validarFormularioDos) {
            this.usuarioService
              .findUsuarioRUUsername(
                this.FormularioCuenta.get('usuario')?.value,
              )
              .subscribe(
                (resp) => {
                  if (
                    resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                  ) {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'El username ya esta asociado a otro usuario, intenta con otro',
                    );
                  } else {
                    this.usuarioService
                      .findUsuarioUsername(
                        this.FormularioCuenta.get('usuario')?.value,
                      )
                      .subscribe((resp) => {
                        if (
                          resp.internalCode ==
                          INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                        ) {
                          if (resp.data) {
                            this.cerrarSpenner();
                            this.toastrService.warning(
                              'Ya existe una cuenta registrada con este nombre de usuario',
                            );
                          } else {
                            this.datosRegistro = {
                              uuid: null,
                              tipo_usuario: 0,
                              nombre_razon_social: '',
                              primer_apellido: null,
                              segundo_apellido: null,
                              rfc: '',
                              curp: null,
                              correo: '',
                              fecha_nacimiento: null,
                              usuario: '',
                              contrasenia: '',
                              id_estado: null,
                              id_pais: PAIS.MEXICO,
                              id_remitente: null,
                              es_extranjero: false,
                              con_certificado: false,
                              sexo: this.sexo == '' ? null : this.sexo,
                              id_solicitante: TIPO_SOLICITANTE.SOLICITANTE,
                              id_reg_unico: null,
                              id_tipo_rol: TIPO_SOLICITANTE.SOLICITANTE,
                              cargo_profesion: '',
                            };
                            const formularioConFirma =
                              this.FormularioConfirma.getRawValue();
                            const formularioSinFirma =
                              this.FormularioSinFirma.getRawValue();
                            const formularioCuenta =
                              this.FormularioCuenta.getRawValue();
                            const formularioEsNacional =
                              this.FormularioEsNacional.getRawValue();
                            this.datosRegistro.tipo_usuario = this.tipoPersona;
                            this.datosRegistro.con_certificado =
                              this.FormularioFirmaElectronica.get(
                                'firma',
                              )?.value;

                            this.datosRegistro.rfc = this.datosRegistro
                              .con_certificado
                              ? formularioConFirma.rfc
                              : formularioSinFirma.rfc;
                            this.datosRegistro.usuario =
                              formularioCuenta.usuario;
                            this.datosRegistro.contrasenia =
                              formularioCuenta.contra1;
                            this.datosRegistro.es_extranjero =
                              formularioEsNacional.es_nacional ? false : true;
                            this.datosRegistro.strCer =
                              this.FormularioFirmaElectronica.get('cer')?.value;
                            this.datosRegistro.strKey =
                              this.FormularioFirmaElectronica.get('key')?.value;
                            this.datosRegistro.strClave =
                              this.FormularioFirmaElectronica.get(
                                'contra',
                              )?.value;
                            if (
                              this.tipoPersona === TIPO_PERSONA.PERSONA_MORAL
                            ) {
                              const formularioMoral =
                                this.FormularioDatosGeneralesMoral.getRawValue();
                              this.datosRegistro.nombre_razon_social =
                                formularioMoral.razon_social;
                              this.datosRegistro.correo =
                                formularioMoral.correo;
                              this.datosRegistro.id_pais = Number(
                                formularioMoral.id_pais,
                              );
                              this.datosRegistro.id_remitente = Number(
                                formularioMoral.id_remitente,
                              );
                              this.datosRegistro.id_estado = Number(
                                formularioMoral.id_estado,
                              );
                              this.datosRegistro.cargo_profesion =
                                formularioMoral.cargo_profesion;
                              this.datosRegistro.id_tipo_rol =
                                TIPO_SOLICITANTE.SOLICITANTE;
                            } else {
                              this.datosRegistro.id_remitente =
                                TIPO_REMITENTE.FISICA;
                              if (formularioEsNacional.es_nacional) {
                                const formularioDatosGeneralesNacional =
                                  this.FormularioDatosGeneralesNacional.getRawValue();
                                this.datosRegistro.curp =
                                  formularioDatosGeneralesNacional.curp;
                                this.datosRegistro.nombre_razon_social =
                                  formularioDatosGeneralesNacional.nombre;
                                this.datosRegistro.primer_apellido =
                                  formularioDatosGeneralesNacional.primer_apellido;
                                this.datosRegistro.segundo_apellido =
                                  formularioDatosGeneralesNacional.segundo_apellido;
                                this.datosRegistro.fecha_nacimiento =
                                  formularioDatosGeneralesNacional.fecha_nacimiento;
                                this.datosRegistro.correo =
                                  formularioDatosGeneralesNacional.correo;
                                this.datosRegistro.id_estado =
                                  formularioDatosGeneralesNacional.id_estado;
                                this.datosRegistro.cargo_profesion =
                                  formularioDatosGeneralesNacional.cargo_profesion;
                                this.datosRegistro.id_pais = Number(
                                  formularioDatosGeneralesNacional.id_pais,
                                );
                                this.datosRegistro.id_tipo_rol =
                                  TIPO_SOLICITANTE.SOLICITANTE;
                              } else {
                                const formularioDatosGeneralesExtrangero =
                                  this.FormularioDatosGeneralesExtrangero.getRawValue();
                                this.datosRegistro.nombre_razon_social =
                                  formularioDatosGeneralesExtrangero.nombre;
                                this.datosRegistro.primer_apellido =
                                  formularioDatosGeneralesExtrangero.primer_apellido;
                                this.datosRegistro.segundo_apellido =
                                  formularioDatosGeneralesExtrangero.segundo_apellido;
                                this.datosRegistro.correo =
                                  formularioDatosGeneralesExtrangero.correo;
                                this.datosRegistro.fecha_nacimiento =
                                  formularioDatosGeneralesExtrangero.fecha_nacimiento;
                                this.datosRegistro.id_pais = Number(
                                  formularioDatosGeneralesExtrangero.id_pais,
                                );
                                this.datosRegistro.cargo_profesion =
                                  formularioDatosGeneralesExtrangero.cargo_profesion;
                                this.datosRegistro.id_tipo_rol =
                                  TIPO_SOLICITANTE.SOLICITANTE;
                                this.datosRegistro.strKey =
                                  this.FormularioConfirma.get('key')?.value;
                                this.datosRegistro.strCer =
                                  this.FormularioConfirma.get('cer')?.value;
                                this.datosRegistro.strClave =
                                  this.FormularioConfirma.get('contra')?.value;
                              }
                            }
                            this.wizardComponent.siguiente();
                            this.cerrarSpenner();
                          }
                        }
                      });
                  }
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error) => {
                  this.cerrarSpenner();
                },
              );
          } else {
            this.cerrarSpenner();
          }
        }

        break;
      case 3:
        const mensaje = '¿Estas seguro que quieres enviar la información?';
        this.confirmarModalService.abriraModal(mensaje).subscribe((result) => {
          if (result) {
            if (
              this.inicioSesion == true &&
              this.uuidLogin !== '' &&
              this.uuidLogin != null
            ) {
              this.datosRegistro.uuid = this.uuidLogin.toString();
            }

            const FormEFirma = this.FormularioFirmaElectronica.value;

            if (!FormEFirma) {
              this.mostrarSpenner();
              this.usuarioService
                .postEnviaRegistroUsuario(this.datosRegistro)
                .subscribe(
                  (resp) => {
                    if (
                      resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                    ) {
                      this.wizardComponent.siguiente();
                      this.cerrarSpenner();
                    } else {
                      this.toastrService.warning(resp.message);
                      this.cerrarSpenner();
                    }
                  },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  (error) => {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Ocurrio un error en el sistema',
                    );
                  },
                );
            } else {
              const FormularioEFirma = this.FormularioConfirma.getRawValue();

              this.datosRegistro.strCer = FormularioEFirma.cer;
              this.datosRegistro.strKey = FormularioEFirma.key;
              this.datosRegistro.strClave = FormularioEFirma.contra;

              this.mostrarSpenner();
              this.usuarioService
                .postEnviaRegUsuarioEFirma(this.datosRegistro)
                .subscribe(
                  (resp) => {
                    if (
                      resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                    ) {
                      this.wizardComponent.siguiente();
                      this.cerrarSpenner();
                    } else {
                      this.toastrService.warning(resp.message);
                      this.cerrarSpenner();
                    }
                  },
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  (error) => {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Ocurrio un error en el sistema',
                    );
                  },
                );
            }
          }
        });
        break;
      case 4:
        this.wizardComponent.siguiente();
        break;
      default:
        break;
    }
    this.direccion = 1;
    return '';
  }

  validarFormulario(step: number) {
    if (step === 1) {
      if (this.tipoPersona === TIPO_PERSONA.PERSONA_FISICA) {
        if (this.FormularioEsNacional.get('es_nacional')?.value) {
          if (
            !this.FormularioDatosGeneralesNacional.valid ||
            !this.FormularioDatosGeneralesNacional?.get('nombre')?.value ||
            !this.FormularioDatosGeneralesNacional.get('primer_apellido') ||
            !this.FormularioDatosGeneralesNacional.get('fecha_nacimiento') ||
            !this.FormularioDatosGeneralesNacional.get('id_pais') ||
            !this.FormularioDatosGeneralesNacional.get('id_estado')
          ) {
            Object.values(
              this.FormularioDatosGeneralesNacional.controls,
            ).forEach((control) => {
              if (control.value === null || control.value === '') {
                control.markAsTouched();
              }
            });
            this.toastrService.warning(
              'Formulario incorrecto: Validar todos los campos',
            );
            return false;
          }
        } else {
          if (!this.FormularioDatosGeneralesExtrangero.valid) {
            Object.values(
              this.FormularioDatosGeneralesExtrangero.controls,
            ).forEach((control) => {
              if (control.value === null || control.value === '') {
                control.markAsTouched();
              }
            });
            this.toastrService.warning(
              'Formulario incorrecto: Validar todos los campos',
            );
            return false;
          }
        }
      } else if (this.tipoPersona === TIPO_PERSONA.PERSONA_MORAL) {
        const formularioMoral =
          this.FormularioDatosGeneralesMoral.getRawValue();
        if (this.FormularioEsNacional.get('es_nacional')?.value) {
          if (
            formularioMoral.correo === '' ||
            formularioMoral.razon_social === '' ||
            formularioMoral.id_remitente == 0 ||
            formularioMoral.id_estado == '0' ||
            formularioMoral.cargo_profesion === ''
          ) {
            Object.values(this.FormularioDatosGeneralesMoral.controls).forEach(
              (control) => {
                control.markAsTouched();
                if (
                  control.value === null ||
                  control.value === '' ||
                  control.value === 0
                ) {
                  control.markAsTouched();
                }
              },
            );
            this.toastrService.warning(
              'Formulario incorrecto: Validar todos los campos.',
            );
            return false;
          }
        } else {
          if (
            formularioMoral.correo === '' ||
            formularioMoral.razon_social === '' ||
            formularioMoral.id_pais == 0 ||
            formularioMoral.id_remitente == 0 ||
            formularioMoral.cargo_profesion === ''
          ) {
            Object.values(this.FormularioDatosGeneralesMoral.controls).forEach(
              (control) => {
                control.markAsTouched();
                if (control.value === null || control.value === '') {
                  control.markAsTouched();
                }
              },
            );
            this.toastrService.warning(
              'Formulario incorrecto: Validar todos los campos.',
            );
            return false;
          }
        }
      }
      return true;
    }
    if (step === 2) {
      if (this.FormularioCuenta.valid) {
        if (
          this.FormularioCuenta.get('contra1')?.value !=
          this.FormularioCuenta.get('contra2')?.value
        ) {
          this.toastrService.warning('La contraseña no coincide');
          Object.values(this.FormularioCuenta.controls).forEach((control) => {
            control.markAsTouched();
          });
          return false;
        }
      } else {
        this.toastrService.warning(
          'Formulario incorrecto: Validar todos los campos',
        );
        Object.values(this.FormularioCuenta.controls).forEach((control) => {
          control.markAsTouched();
        });
        return false;
      }
      return true;
    }
    return true;
  }

  atras() {
    this.wizardComponent.atras();
    this.direccion = -1;
    return '';
  }

  confirmar() {
    this.wizardComponent.siguiente();
    this.router.navigateByUrl('/auth/login');
  }

  crearFormularioFirmaElectronica() {
    this.FormularioFirmaElectronica = this.fb.group({
      firma: [true],
    });
  }

  crearFormularioEsNacional() {
    this.FormularioEsNacional = this.fb.group({
      es_nacional: [true],
    });
  }

  crearFormularioConFirma() {
    this.FormularioConfirma = this.fb.group({
      key: ['', [Validators.required]],
      cer: ['', [Validators.required]],
      contra: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_RFC)]],
      firma: [''],
      no_serie: [''],
    });
  }

  crearFormularioSinFirma() {
    this.FormularioSinFirma = this.fb.group({
      rfc: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_RFC)]],
    });
  }

  crearFormularioDatosGeneralesNacional() {
    this.FormularioDatosGeneralesNacional = this.fb.group({
      curp: [
        '',
        [Validators.required, Validators.pattern(CONSTANTES.EXP_CURP)],
      ],
      nombre: [{ value: '', disabled: true }, [Validators.required]],
      primer_apellido: [{ value: '', disabled: true }, [Validators.required]],
      segundo_apellido: [
        { value: null, disabled: true },
        [Validators.required],
      ],
      fecha_nacimiento: [{ value: '', disabled: true }, [Validators.required]],
      correo: [
        '',
        [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
      ],
      id_estado: [{ value: 0, disabled: true }, [Validators.required]],
      id_pais: [{ value: PAIS.MEXICO, disabled: true }, [Validators.required]],
      cargo_profesion: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  crearFormularioDatosGeneralesExtrangero() {
    this.FormularioDatosGeneralesExtrangero = this.fb.group({
      nombre: ['', [Validators.required]],
      primer_apellido: ['', [Validators.required]],
      segundo_apellido: [null],
      fecha_nacimiento: ['', [Validators.required]],
      correo: [
        '',
        [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
      ],
      id_pais: [null, [Validators.required]],
      cargo_profesion: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  crearFormularioDatosGeneralesMoral() {
    this.FormularioDatosGeneralesMoral = this.fb.group({
      razon_social: ['', [Validators.required]],
      correo: [
        '',
        [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
      ],
      id_pais: [0, [Validators.required]],
      id_remitente: [0, [Validators.required]],
      id_estado: [0, [Validators.required]],
      cargo_profesion: ['', [Validators.required]],
    });

    this.FormularioDatosGeneralesMoral.controls['id_pais'].disable();
  }

  crearFormularioCuenta() {
    this.FormularioCuenta = this.fb.group(
      {
        usuario: [
          '',
          [Validators.required, Validators.pattern(CONSTANTES.EXP_USUARIO)],
        ],
        contra1: [
          '',
          {
            validators: Validators.compose([
              PasswordValidation.validPassword(true),
            ]),
          },
        ],
        contra2: ['', [Validators.required]],
      },
      { validator: PasswordValidation.matchPassword('contra1', 'contra2') },
    );
  }

  createForm() {
    this.LoginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  reset() {
    const newWindow = window.open('/auth/resetContraRegUnico', '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  recoverAccount() {
    const newWindow = window.open(
      '/auth/recuperarCuentaRegistroUnico',
      '_blank',
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  formatearFecha(fecha: string): string {
    const fechaOriginal = new Date(fecha);
    const fechaComoString = fechaOriginal.toISOString();
    const fechaPartes = fechaComoString.split('T')[0].split('-');
    const anio = fechaPartes[0];
    const mes = this.agregarCerosIzquierda(parseInt(fechaPartes[1], 10));
    const dia = this.agregarCerosIzquierda(parseInt(fechaPartes[2], 10));
    return `${dia}/${mes}/${anio}`;
  }

  agregarCerosIzquierda(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  async cargaPersonaImportada() {
    this.mostrarSpenner();

    if (!this.escenario?.persona) {
      const message = `Error inesperado, el objeto persona no contiene datos, Trackinfo: '513697ba-4ef5-5838-940a-43cc02371908'`;
      this.toastrService.error(message);
      this.router.navigateByUrl('/auth/login');
      throw new Error(message);
    }

    this.FormularioDatosGeneralesMoral.get('id_pais')?.setValue(
      this.escenario.persona.idPais,
    );

    if (this.escenario.persona.rfc.length === 12) {
      this.FormularioDatosGeneralesMoral.get('razon_social')?.setValue(
        this.escenario.persona.nombreRazonSocial,
      );
      if (this.escenario?.persona) {
        this.FormularioDatosGeneralesMoral.get('cargo_profesion')?.setValue(
          this.escenario.persona.profesion,
        );
      }
      this.FormularioEsNacional.get('es_nacional')?.setValue(true);
      const nombreEstadoSeleccionado = this.escenario.persona.idEstado;
      this.FormularioEsNacional.get('es_nacional')?.setValue(true);
      const EstadoSeleccionado = this.listaEstados.find(
        (estado) => estado.nombre === nombreEstadoSeleccionado,
      );
      this.FormularioDatosGeneralesMoral.get('id_estado')?.setValue(
        this.escenario?.persona
          ? this.escenario.persona.idEstado
          : EstadoSeleccionado?.id,
      );

      if (this.escenario?.persona) {
        this.FormularioDatosGeneralesMoral.get('id_remitente')?.setValue(
          this.escenario.persona.idRemitente,
        );
      }

      this.FormularioEsNacional.controls['es_nacional'].disable();
      this.FormularioDatosGeneralesMoral.controls['id_pais'].disable();
      this.FormularioDatosGeneralesMoral.controls['id_remitente'].disable();
      if (!this.escenario.modificable) {
        this.FormularioDatosGeneralesMoral.controls['razon_social'].disable();
      }
    } else {
      this.FormularioEsNacional.get('es_nacional')?.setValue(true);
      this.FormularioEsNacional.controls['es_nacional'].disable();
      if (this.escenario.persona.curp) {
        this.FormularioDatosGeneralesNacional.get('curp')?.setValue(
          this.escenario.persona.curp,
        );
      }
      this.cerrarSpenner();
    }

    this.cerrarSpenner();
  }

  login() {
    this.inicioSesion = true;
    const datosAcceso: datosUsuarioRU = {
      username: this.LoginForm.get('usuario')?.value,
      password: this.LoginForm.get('password')?.value,
      rfc: this.FormularioConfirma.get('rfc')?.value,
    };
    this.mostrarSpenner();
    if (this.LoginForm.valid) {
      this.usuarioService.getLoginRegistroUnico(datosAcceso).subscribe(
        (resp) => {
          if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
            const datosUR = JSON.stringify(resp.data);
            const datosObtenidosUR: DatosRegistroUnico = JSON.parse(datosUR);
            const llamada1$ =
              this.usuarioService.getLoginRegistroUnico(datosAcceso);
            const llamada2$ = this.usuarioService.findUsuarioSidep(
              datosObtenidosUR.correo,
            );
            this.uuidLogin = datosObtenidosUR.id;
            forkJoin([llamada1$, llamada2$]).subscribe(
              async ([resultadoLlamada1, resultadoLlamada2]) => {
                // Aquí obtienes los resultados de ambas llamadas una vez que han finalizado
                const datos = JSON.stringify(resultadoLlamada1.data);
                const datosObtenidos: DatosRegistroUnico = JSON.parse(datos);
                const datosPersona = JSON.stringify(resultadoLlamada2.data);
                const objetoJSON = JSON.parse(datosPersona);
                this.fechanacimiento =
                  objetoJSON !== null
                    ? this.formatearFecha(objetoJSON.constanciaNacimiento)
                    : '';

                const nombrePaisSeleccionado = datosObtenidos.pais;
                const paisSeleccionado = this.listaPaises.find(
                  (pais) => pais.nombre === nombrePaisSeleccionado,
                );
                this.FormularioDatosGeneralesMoral.get('id_pais')?.setValue(
                  this.escenario?.persona
                    ? this.escenario.persona.idPais
                    : paisSeleccionado?.id,
                );

                if (datosObtenidos.tipoPersona === TIPO_PERSONA.PERSONA_MORAL) {
                  this.FormularioDatosGeneralesMoral.get(
                    'razon_social',
                  )?.setValue(
                    this.escenario?.persona
                      ? this.escenario.persona.nombreRazonSocial
                      : datosObtenidos.razonSocial,
                  );
                  if (this.escenario?.persona) {
                    this.FormularioDatosGeneralesMoral.get(
                      'cargo_profesion',
                    )?.setValue(this.escenario.persona.profesion);
                  }
                  this.FormularioDatosGeneralesMoral.get('correo')?.setValue(
                    datosObtenidos.correo,
                  );
                  const nombrePaisSeleccionado = this.escenario?.persona
                    ? this.escenario.persona.idPais
                    : datosObtenidos.pais;
                  const paisSeleccionado = this.listaPaises.find(
                    (pais) => pais.nombre === nombrePaisSeleccionado,
                  );

                  if (paisSeleccionado?.id === PAIS.MEXICO)
                    this.FormularioEsNacional.get('es_nacional')?.setValue(
                      true,
                    );
                  else
                    this.FormularioEsNacional.get('es_nacional')?.setValue(
                      false,
                    );
                  this.FormularioDatosGeneralesMoral.get(
                    'id_remitente',
                  )?.setValue(
                    this.escenario?.persona
                      ? this.escenario.persona.idRemitente
                      : objetoJSON !== null
                        ? objetoJSON.idRemitente
                        : 1,
                  );
                  const nombreEstadoSeleccionado = this.escenario?.persona
                    ? this.escenario.persona.idEstado
                    : datosObtenidos.estado;
                  if (
                    this.escenario?.tipo === 'A' ||
                    this.escenario?.tipo === 'D'
                  ) {
                    this.FormularioEsNacional.get('es_nacional')?.setValue(
                      true,
                    );
                    this.FormularioEsNacional.controls['es_nacional'].disable();
                  }
                  const EstadoSeleccionado = this.listaEstados.find(
                    (estado) => estado.nombre === nombreEstadoSeleccionado,
                  );
                  this.FormularioDatosGeneralesMoral.get('id_estado')?.setValue(
                    this.escenario?.persona
                      ? this.escenario.persona.idEstado
                      : EstadoSeleccionado?.id,
                  );
                  if (this.escenario) {
                    this.FormularioDatosGeneralesMoral.controls[
                      'id_pais'
                    ].disable();
                    if (this.escenario.tipo !== 'B') {
                      this.FormularioDatosGeneralesMoral.controls[
                        'id_remitente'
                      ].disable();
                    }
                  }
                  if (this.escenario && !this.escenario.modificable) {
                    this.FormularioDatosGeneralesMoral.controls[
                      'razon_social'
                    ].disable();
                  }
                } else {
                  if (paisSeleccionado?.id === PAIS.MEXICO) {
                    if (datosObtenidos.curp) {
                      this.FormularioDatosGeneralesNacional.get(
                        'curp',
                      )?.setValue(datosObtenidos.curp);
                    }

                    if (this.escenario) {
                      this.FormularioDatosGeneralesNacional.controls[
                        'nombre'
                      ].enable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'primer_apellido'
                      ].enable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'segundo_apellido'
                      ].enable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'fecha_nacimiento'
                      ].enable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'id_estado'
                      ].enable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'id_pais'
                      ].enable();

                      if (this.escenario?.persona) {
                        this.FormularioDatosGeneralesNacional.get(
                          'nombre',
                        )?.setValue(this.escenario.persona.nombreRazonSocial);
                        this.FormularioDatosGeneralesNacional.get(
                          'primer_apellido',
                        )?.setValue(this.escenario.persona.primerApellido);
                        this.FormularioDatosGeneralesNacional.get(
                          'segundo_apellido',
                        )?.setValue(this.escenario.persona.segundoApellido);

                        let nuevaFecha =
                          this.escenario.persona.constanciaNacimiento.split(
                            'T',
                          )[0];
                        nuevaFecha = nuevaFecha.replace(/-/g, '/');

                        this.FormularioDatosGeneralesNacional.get(
                          'fecha_nacimiento',
                        )?.setValue(nuevaFecha);
                        this.FormularioDatosGeneralesNacional.get(
                          'id_estado',
                        )?.setValue(this.escenario.persona.idEstado);
                        this.FormularioDatosGeneralesNacional.get(
                          'id_pais',
                        )?.setValue(this.escenario.persona.idPais);
                      }
                      this.FormularioDatosGeneralesNacional.controls[
                        'nombre'
                      ].disable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'primer_apellido'
                      ].disable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'segundo_apellido'
                      ].disable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'fecha_nacimiento'
                      ].disable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'id_estado'
                      ].disable();
                      this.FormularioDatosGeneralesNacional.controls[
                        'id_pais'
                      ].disable();

                      Object.values(
                        this.FormularioDatosGeneralesNacional.controls,
                      ).forEach((control) => {
                        if (control.status == 'DISABLED') {
                          control.markAsUntouched();
                        }
                      });
                    }

                    this.cerrarSpenner();
                  } else {
                    this.FormularioDatosGeneralesExtrangero.get(
                      'nombre',
                    )?.setValue(datosObtenidos.nombre);
                    this.FormularioDatosGeneralesExtrangero.get(
                      'primer_apellido',
                    )?.setValue(datosObtenidos.apellidoMaterno);
                    this.FormularioDatosGeneralesExtrangero.get(
                      'segundo_apellido',
                    )?.setValue(datosObtenidos.apellidoPaterno);
                    this.FormularioDatosGeneralesExtrangero.get(
                      'correo',
                    )?.setValue(datosObtenidos.correo);
                    this.FormularioDatosGeneralesExtrangero.get(
                      'fecha_nacimiento',
                    )?.setValue(this.fechanacimiento);
                    const nombrePaisSeleccionado = datosObtenidos.pais;
                    const paisSeleccionado = this.listaPaises.find(
                      (pais) => pais.nombre === nombrePaisSeleccionado,
                    );
                    this.FormularioDatosGeneralesExtrangero.get(
                      'id_pais',
                    )?.setValue(paisSeleccionado?.id);
                    if (paisSeleccionado?.id === PAIS.MEXICO)
                      this.FormularioEsNacional.get('es_nacional')?.setValue(
                        true,
                      );
                    else
                      this.FormularioEsNacional.get('es_nacional')?.setValue(
                        false,
                      );
                  }
                }

                this.toastrService.success(resp.message);
                this.FormularioCuenta.controls['usuario'].enable();
                this.FormularioCuenta.get('usuario')?.setValue(
                  this.LoginForm.get('usuario')?.value,
                );
                this.FormularioCuenta.get('contra1')?.setValue(
                  this.LoginForm.get('password')?.value,
                );
                this.FormularioCuenta.get('contra2')?.setValue(
                  this.LoginForm.get('password')?.value,
                );
                this.recuperarContrasenia = true;
                this.cerrarSpenner();
                this.wizardComponent.siguiente();
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (error) => {},
            );
          } else {
            this.toastrService.warning(resp.message);
            this.cerrarSpenner();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error) => {
          this.toastrService.warning('Ocurrio un error en el sistema');
          this.cerrarSpenner();
        },
      );
    } else {
      this.toastrService.warning('Todos los campos son obligatorios');
      this.cerrarSpenner();
    }
  }

  verContra1() {
    this.contra1 = !this.contra1;
  }

  verContra2() {
    this.contra2 = !this.contra2;
  }

  cambioFechaNacimiento(nuevoValor: string) {
    this.FormularioDatosGeneralesExtrangero.get('fecha_nacimiento')?.setValue(
      nuevoValor,
    );
    this.FormularioDatosGeneralesExtrangero.get(
      'fecha_nacimiento',
    )?.markAsUntouched();
  }

  cambioNacional() {
    if (this.tipoPersona == TIPO_PERSONA.PERSONA_MORAL) {
      this.obtenerRemitente(1);
      this.FormularioDatosGeneralesMoral.controls['id_pais'].enable();
      this.FormularioDatosGeneralesMoral.get('id_pais')?.setValue(PAIS.MEXICO);
      this.FormularioDatosGeneralesMoral.controls['id_pais'].disable();
      this.FormularioDatosGeneralesMoral.controls['id_estado'].enable();
      this.FormularioDatosGeneralesMoral.get('id_estado')?.setValue(1);
    }
  }

  cambioExtrangero() {
    if (this.tipoPersona == TIPO_PERSONA.PERSONA_MORAL) {
      this.FormularioDatosGeneralesMoral.get('id_pais')?.markAsUntouched();
      this.FormularioDatosGeneralesMoral.controls['id_pais'].enable();
      this.FormularioDatosGeneralesMoral.get('id_pais')?.markAsUntouched();
      this.obtenerRemitente(2);
    }

    this.FormularioDatosGeneralesExtrangero.get('id_pais')?.markAsUntouched();
  }

  convertirAMayusculasNacional(event: any) {
    const inputControl: FormControl = this.FormularioDatosGeneralesNacional.get(
      'curp',
    ) as FormControl;
    const newValue: string = event.target.value.toUpperCase();
    inputControl.setValue(newValue);
  }

  convertirAMayusculasRfc(event: any) {
    const inputControl: FormControl = this.FormularioSinFirma.get(
      'rfc',
    ) as FormControl;
    const newValue: string = event.target.value.toUpperCase();
    inputControl.setValue(newValue);
  }

  obtenerEntidades() {
    this.mostrarSpenner();
    this.estadosService.getEstados().subscribe(
      (resp) => {
        if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
          this.listaEstados = resp.data;
          this.cerrarSpenner();
        } else {
          this.cerrarSpenner();
          this.toastrService.warning(resp.message);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        this.cerrarSpenner();
        this.toastrService.warning('Ocurrio un error en el sistema');
      },
    );
  }

  obtenerPaises() {
    this.mostrarSpenner();
    this.paisService.getPaises().subscribe(
      (resp) => {
        if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
          this.listaPaises = resp.data;
          this.cerrarSpenner();
        } else {
          this.cerrarSpenner();
          this.toastrService.warning(resp.message);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        this.cerrarSpenner();
        this.toastrService.warning('Ocurrio un error en el sistema');
      },
    );
  }

  obtenerRemitente(tipoPersona: number) {
    this.mostrarSpenner();
    this.remitenteService.getRemitentes().subscribe(
      (resp) => {
        if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
          if (tipoPersona == 1) {
            this.listaRemitentes = [];
            resp.data.forEach((resp) => {
              if (resp.id != 6 && resp.id != 7 && resp.id != 8) {
                this.listaRemitentes.push(resp);
              }
            });
          } else if (tipoPersona == 2) {
            this.listaRemitentes = [];
            resp.data.forEach((resp) => {
              if (resp.id == 7) {
                this.listaRemitentes.push(resp);
              }
            });
          } else {
            this.listaRemitentes = resp.data;
          }
          this.cerrarSpenner();
        } else {
          this.cerrarSpenner();
          this.toastrService.warning(resp.message);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        this.cerrarSpenner();
        this.toastrService.warning('Ocurrio un error en el sistema');
      },
    );
  }

  validaConFirma() {
    this.habilitaLogin = false;
    const rfc: string = this.FormularioFirmaElectronica.get('firma')?.value
      ? this.FormularioConfirma.get('rfc')?.value
      : this.FormularioSinFirma.get('rfc')?.value;
    this.rfcCapturado = rfc;

    this.mostrarSpenner();
    this.usuarioService.getValidaRegistroUnico(rfc).subscribe(
      (resp) => {
        if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
          this.usuarioService.getValidaRegistro(rfc).subscribe(
            (resp) => {
              if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
                this.cerrarSpenner();
                this.toastrService.warning(
                  'Tu RFC ya cuenta con registro en sistema INDEP. Ingresa tu usuario y contraseña',
                );
                this.router.navigateByUrl('/auth/login');
              } else {
                this.usuarioService.getSolicitudes(rfc).subscribe((resp) => {
                  if (
                    resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                  ) {
                    this.FormularioFirmaElectronica.get('firma')?.setValue(
                      true,
                    );
                    this.habilitaLogin = true;
                    if (this.escenario?.username) {
                      this.LoginForm.get('usuario')?.setValue(
                        this.escenario?.username,
                      );
                    }
                    this.cerrarSpenner();
                  } else if (resp.code === '204') {
                    this.toastrService.warning(
                      'Tu RFC ya se encuentra registrado, ingresa tu usuario y contraseña y/o selecciona “Recuperar cuenta”',
                    );
                    this.habilitaLogin = true;
                    if (this.escenario?.username) {
                      this.LoginForm.get('usuario')?.setValue(
                        this.escenario?.username,
                      );
                    }
                    this.cerrarSpenner();
                  } else {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Por el momento no se puede realizar la consulta, inténtelo mas tarde.',
                    );
                  }
                });
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (error) => {
              this.cerrarSpenner();
              this.toastrService.warning('Ocurrio un error en el sistema');
            },
          );
        } else {
          this.usuarioService.getSolicitudes(rfc).subscribe(async (resp) => {
            if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
              this.cerrarSpenner();
              this.wizardComponent.siguiente();
              this.obtenerRemitente(1);
            } else {
              this.cerrarSpenner();
              this.wizardComponent.siguiente();
              this.obtenerRemitente(1);
            }
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        this.toastrService.warning('Ocurrio un error en el sistema');
        this.cerrarSpenner();
      },
    );
  }

  validaSinFirma() {
    this.habilitaLogin = false;
    const rfc: string = this.FormularioFirmaElectronica.get('firma')?.value
      ? this.FormularioConfirma.get('rfc')?.value
      : this.FormularioSinFirma.get('rfc')?.value;
    this.mostrarSpenner();
    this.usuarioService.getValidaRegistroUnico(rfc).subscribe(
      (resp) => {
        if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
          this.usuarioService.getValidaRegistro(rfc).subscribe(
            (resp) => {
              if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
                this.cerrarSpenner();
                this.toastrService.warning(
                  'El usuario ya existe en ambos sistemas',
                );
                this.router.navigateByUrl('/auth/login');
              } else {
                this.usuarioService.getSolicitudes(rfc).subscribe((resp) => {
                  if (
                    resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS
                  ) {
                    this.cerrarSpenner();
                    this.FormularioFirmaElectronica.get('firma')?.setValue(
                      true,
                    );
                    this.toastrService.warning(
                      'Ya cuenta con solicitudes se debe registrar con firma electrónica',
                    );
                    this.router.navigateByUrl('/auth/registroUsuario');
                  } else if (resp.code === '204') {
                    this.habilitaLogin = true;
                    this.mostrarCuenta = true;
                    if (this.escenario?.username) {
                      this.LoginForm.get('usuario')?.setValue(
                        this.escenario?.username,
                      );
                    }
                    this.cerrarSpenner();
                  } else {
                    this.cerrarSpenner();
                    this.toastrService.warning(
                      'Por el momento no se puede realizar la consulta, inténtelo mas tarde.',
                    );
                  }
                });
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (error) => {
              this.cerrarSpenner();
              this.toastrService.warning('Ocurrio un error en el sistema');
            },
          );
        } else {
          this.usuarioService.getSolicitudes(rfc).subscribe((resp) => {
            if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
              this.cerrarSpenner();
              this.FormularioFirmaElectronica.get('firma')?.setValue(true);
              this.toastrService.warning(
                'Ya cuenta con solicitudes se debe registrar con firma electrónica',
              );
              this.router.navigateByUrl('/auth/registroUsuario');
            } else {
              this.cerrarSpenner();
              this.wizardComponent.siguiente();
            }
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        this.toastrService.warning('Ocurrio un error en el sistema');
        this.cerrarSpenner();
      },
    );
  }

  validaCurp() {
    if (!this.FormularioDatosGeneralesNacional.get('curp')?.value) {
      return;
    }
    if (
      CONSTANTES.EXP_CURP.test(
        this.FormularioDatosGeneralesNacional.get('curp')?.value,
      )
    ) {
      const datos: datosCurp = {
        CURP: this.FormularioDatosGeneralesNacional.get('curp')?.value,
      };

      this.mostrarSpenner();
      const curp = this.FormularioDatosGeneralesNacional.get('curp')?.value;
      const validarCurp = this.validarRfcVSCurp(curp, this.rfcCapturado);
      if (validarCurp) {
        this.usuarioService.getValidaCurp(datos).subscribe(
          (resp) => {
            if (resp.internalCode == INTERNAL_CODES.INTERNAL_CODE_SUCCESS) {
              const datosCURP = resp.data;
              this.usuarioService.findUsuarioCURP(datosCURP.CURP).subscribe(
                (resp) => {
                  if (
                    resp.internalCode ===
                      INTERNAL_CODES.INTERNAL_CODE_SUCCESS ||
                    this.inicioSesion === true
                  ) {
                    this.sexo = datosCURP.sexo;
                    const cveEntidad = this.cambioEntidadService.cambioEntidad(
                      datosCURP.numEntidadReg,
                    );

                    this.FormularioDatosGeneralesNacional.controls[
                      'nombre'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'primer_apellido'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'segundo_apellido'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'fecha_nacimiento'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'id_estado'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'id_pais'
                    ].enable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'id_estado'
                    ].enable();

                    this.FormularioDatosGeneralesNacional.get(
                      'nombre',
                    )?.setValue(datosCURP.nombres);
                    this.FormularioDatosGeneralesNacional.get(
                      'primer_apellido',
                    )?.setValue(datosCURP.apellido1);
                    this.FormularioDatosGeneralesNacional.get(
                      'segundo_apellido',
                    )?.setValue(datosCURP.apellido2);
                    this.FormularioDatosGeneralesNacional.get(
                      'fecha_nacimiento',
                    )?.setValue(datosCURP.fechNac);
                    this.FormularioDatosGeneralesNacional.get(
                      'id_pais',
                    )?.setValue(PAIS.MEXICO);

                    this.FormularioDatosGeneralesNacional.controls[
                      'nombre'
                    ].disable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'primer_apellido'
                    ].disable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'segundo_apellido'
                    ].disable();
                    this.FormularioDatosGeneralesNacional.controls[
                      'fecha_nacimiento'
                    ].disable();

                    this.FormularioDatosGeneralesNacional.controls[
                      'id_pais'
                    ].disable();

                    const findEstado = this.listaEstados.some(
                      (item) => item.id === cveEntidad,
                    );

                    if (findEstado) {
                      this.FormularioDatosGeneralesNacional.get(
                        'id_estado',
                      )?.setValue(cveEntidad);
                      this.FormularioDatosGeneralesNacional.controls[
                        'id_estado'
                      ].disable();
                    }

                    Object.values(
                      this.FormularioDatosGeneralesNacional.controls,
                    ).forEach((control) => {
                      if (control.status == 'DISABLED') {
                        control.markAsUntouched();
                      }
                    });

                    this.cerrarSpenner();
                  } else {
                    this.cerrarSpenner();
                    this.toastrService.warning(resp.message);
                  }
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error) => {
                  this.toastrService.warning('Ocurrio un error en el sistema');
                  this.cerrarSpenner();
                },
              );
            } else {
              this.toastrService.warning(resp.message);
              this.FormularioDatosGeneralesNacional.get(
                'curp',
              )?.markAsTouched();
              Object.values(
                this.FormularioDatosGeneralesNacional.controls,
              ).forEach((control) => {
                if (control.status == 'DISABLED') {
                  control.markAsTouched();
                }
              });
              this.cerrarSpenner();
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (error) => {
            this.toastrService.warning('Ocurrio un error en el sistema');
            this.cerrarSpenner();
          },
        );
      } else {
        this.toastrService.warning(
          'El curp debe corresponder con el rfc que capturo',
        );
        this.FormularioDatosGeneralesNacional.reset();
        this.cerrarSpenner();
      }
    } else {
      this.toastrService.warning('CURP no válido');
      this.FormularioDatosGeneralesNacional.get('curp')?.markAsTouched();
    }
  }

  validarRfcVSCurp(curp: string, rfc: string) {
    const cur = curp.substring(0, 10);
    const rfcLength = rfc.substring(0, 10);
    if (cur === rfcLength) {
      return true;
    } else {
      return false;
    }
  }

  public async getEscenario() {
    this.mostrarSpenner();
    const valorFirmado: string = this.FormularioConfirma.get('firma')?.value;
    const rfc = valorFirmado
      ? this.FormularioConfirma.get('rfc')?.value
      : this.FormularioSinFirma.get('rfc')?.value;
    const respuesta = (await this.usuarioService.getEscenario(
      rfc,
      valorFirmado,
    )) as BaseResponse<EscenarioRegistro>;
    if (!respuesta) {
      const message = `Valor no aceptable, Trackinfo: 'dadc9fde-0473-5f2f-a233-6850171777e4'`;
      this.toastrService.error(message);
      this.router.navigateByUrl('/auth/login');
      throw new Error(message);
    }
    if (respuesta.code !== '200') {
      this.toastrService.error(respuesta.message);
      this.router.navigateByUrl('/auth/login');
      this.mostrarSpenner();
      throw new Error(respuesta.message);
    }
    this.escenario = respuesta.data;
    this.mostrarSpenner();
  }
}
