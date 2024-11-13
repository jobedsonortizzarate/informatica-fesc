import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListaPasosizard } from '../../models/datosRetornoWizard.model';

@Component({
  selector: 'sg-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnChanges {
  @Input() listaPasos: string[] = [];
  @Output() valorIndice = new EventEmitter<any>();

  indiceActual: number = 0;
  inicial: boolean = false;
  lista: ListaPasosizard[] = [];
  maximo: number = 0;

  constructor(private toastrService: ToastrService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['listaPasos'].currentValue != undefined &&
      changes['listaPasos'].currentValue != null
    ) {
      this.listaPasos = changes['listaPasos'].currentValue;
      this.lista = [];
      this.listaPasos.forEach((element, index) => {
        this.inicial = index == 0 ? true : false;
        this.lista.push({
          indice: index,
          titulo: element,
          activo: this.inicial,
          completado: false,
          validado: false,
          final: false,
        });
      });
      this.lista.push({
        indice: this.listaPasos.length - 1,
        titulo: 'Completado',
        activo: false,
        completado: false,
        validado: false,
        final: true,
      });
      this.maximo = this.lista.length - 1;
    }
  }

  ngOnInit() {
    this.lista = [];
    this.listaPasos.forEach((element, index) => {
      this.inicial = index == 0 ? true : false;
      this.lista.push({
        indice: index,
        titulo: element,
        activo: this.inicial,
        completado: false,
        validado: false,
        final: false,
      });
    });
    this.lista.push({
      indice: this.listaPasos.length - 1,
      titulo: 'Completado',
      activo: false,
      completado: false,
      validado: false,
      final: true,
    });
    this.maximo = this.lista.length - 1;
  }

  siguiente(completado: boolean = true) {
    this.indiceActual =
      this.indiceActual == this.maximo
        ? this.indiceActual
        : this.indiceActual + 1;
    this.lista[this.indiceActual - 1].activo = false;
    this.lista[this.indiceActual - 1].completado = completado;
    this.lista[this.indiceActual - 1].validado = completado;
    this.lista[this.indiceActual].activo = true;
    if (this.indiceActual == this.maximo) {
      this.lista[this.maximo].completado = completado;
      this.lista[this.maximo].validado = completado;
      this.lista[this.maximo].activo = completado;
    }
    this.valorIndice.emit({
      indice: this.indiceActual,
      indiceMax: this.maximo,
    });
  }

  atras() {
    this.lista[this.indiceActual].activo = false;
    this.lista[this.indiceActual].validado = false;
    this.lista[this.indiceActual - 1].activo = true;
    this.lista.forEach((element, index) => {
      if (index >= this.indiceActual - 1) {
        element.validado = false;
      }
    });
    this.toastrService.info('Validar el formulario nuevamente');
    this.indiceActual = this.indiceActual == 0 ? 0 : this.indiceActual - 1;
    this.valorIndice.emit({
      indice: this.indiceActual,
      indiceMax: this.maximo,
    });
  }

  cambio(indice: number) {
    if (
      this.lista[indice].completado &&
      this.lista[indice].validado &&
      !this.lista[this.maximo].completado
    ) {
      this.lista[indice].activo = true;
      this.lista.forEach((element, index) => {
        if (index >= indice) {
          element.validado = false;
        }
      });
      this.toastrService.info('Validar el formulario nuevamente');
      this.lista[this.indiceActual].activo =
        indice == this.indiceActual ? true : false;
      this.indiceActual = indice;
      this.valorIndice.emit({
        indice: this.indiceActual,
        indiceMax: this.maximo,
      });
    }
  }
}
