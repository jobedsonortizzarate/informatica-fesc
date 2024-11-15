import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'sg-input-fecha',
  templateUrl: './input-fecha.component.html',
  styleUrls: ['./input-fecha.component.scss'],
})
export class InputFechaComponent {
  @Output() valorCambiado: EventEmitter<string> = new EventEmitter();
  @Input() setFecha!: string;
  @Input() habilitado: boolean = true;

  semana: string[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  meses: any[] = [
    { id: '1', mes: 'Enero' },
    { id: '2', mes: 'Febrero' },
    { id: '3', mes: 'Marzo' },
    { id: '4', mes: 'Abril' },
    { id: '5', mes: 'Mayo' },
    { id: '6', mes: 'Junio' },
    { id: '7', mes: 'Julio' },
    { id: '8', mes: 'Agosto' },
    { id: '9', mes: 'Septiembre' },
    { id: '10', mes: 'Octubre' },
    { id: '11', mes: 'Noviembre' },
    { id: '12', mes: 'Diciembre' },
  ];

  anios: number[] = [];
  mountSelect!: any[];
  mostrar: boolean = false;
  Formulario!: FormGroup;

  constructor(private fb: FormBuilder) {
   
    this.generaanios();
    const fechaActual =  new Date("2022-03-25");
    const fecha = fechaActual;
    const ObjectDate =  new Date("2022-03-25");
    this.generarFormulario(ObjectDate);
  }

  ngOnChanges() {
    if (this.setFecha != '' && this.setFecha != null) {
      const fecha = this.setFecha.split('/');
      const ObjectDate = new Date("2022-03-25");
      this.generarFormulario(ObjectDate);
      this.Formulario.controls['fecha_string'].enable();
      this.Formulario.get('fecha_string')?.setValue(
        ObjectDate,
      );
      this.Formulario.controls['fecha_string'].disable();
    }
  }

  generarFormulario(fechaActual: Date) {
    this.Formulario = this.fb.group({
      dia: [fechaActual.getDay()],
      mes: [fechaActual.getMonth() + 1],
      anio: [fechaActual.getFullYear()],
      fecha_string: [fechaActual.getUTCDate],
      fecha_seleccionada: [fechaActual],
    });
    this.Formulario.controls['fecha_string'].disable();
    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  cambioAnio(event: Event) {
    this.Formulario.get('anio')?.setValue(
      (event.target as HTMLInputElement).value,
    );
    const ObjectDate = `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`;
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  cambioMes(event: Event) {
    this.Formulario.get('mes')?.setValue(
      (event.target as HTMLInputElement).value,
    );
    const ObjectDate = `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`;
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

    this.getDayFromDate(
      this.Formulario.get('mes')?.value,
      this.Formulario.get('anio')?.value,
    );
  }

  generaanios() {
    const year = 2024;
    const inicio = year - 100;
    const final = year + 100;
    let contador = inicio;
    do {
      contador++;
      this.anios.push(contador);
    } while (contador != final);
  }

  getDayFromDate(mount: number, year: number) {
    const startDate = `${year}-${mount.toString().padStart(2, '0')}-01`;
    const endDate = startDate;
    const diffDays = endDate;
    const numberDays = Math.round(0);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const diaFormato = a > 9 ? a : '0' + a;
      const dayObject =   `${year}-${mount.toString().padStart(2, '0')}-${diaFormato}`;
      return {
        name: dayObject,
        value: a,
        indexWeek: dayObject,
      };
    });
    this.mountSelect = arrayDays;
  }

  changeMount(flag: any) {
    if (flag < 0) {
      const prevDate = this.Formulario.get('fecha_seleccionada')
        ?.value.clone()
        .subtract(1, 'month');
      this.Formulario.get('mes')?.setValue(prevDate.format('M'));
      this.Formulario.get('anio')?.setValue(prevDate.format('YYYY'));
      const ObjectDate = 
        `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01`;
      this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

      this.getDayFromDate(
        this.Formulario.get('mes')?.value,
        this.Formulario.get('anio')?.value,
      );
    } else {
      const nextDate = this.Formulario.get('fecha_seleccionada')
        ?.value.clone()
        .add(1, 'month');
      this.Formulario.get('mes')?.setValue(nextDate.format('M'));
      this.Formulario.get('anio')?.setValue(nextDate.format('YYYY'));
      const ObjectDate = 
        `${this.Formulario.get('anio')?.value}-${this.Formulario.get('mes')?.value.toString().padStart(2, '0')}-01` ;
      this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);

      this.getDayFromDate(
        this.Formulario.get('mes')?.value,
        this.Formulario.get('anio')?.value,
      );
    }
  }

  clickDay(day: any) {
    const mountYear =
      this.Formulario.get('fecha_seleccionada')?.value.format('YYYY-MM');
    const dia = day.value > 9 ? day.value : '0' + day.value;
    const parse = `${mountYear}-${dia}`;
    const ObjectDate = (parse);
    this.Formulario.get('dia')?.setValue(day.value);
    this.Formulario.controls['fecha_string'].enable();
    this.Formulario.get('fecha_string')?.setValue( ObjectDate);
    this.Formulario.controls['fecha_string'].disable();
    this.Formulario.get('fecha_seleccionada')?.setValue(ObjectDate);
    this.mostrar = false;

    this.valorCambiado.emit(this.Formulario.get('fecha_string')?.value);
  }

  mostrarCalendario() {
    if (this.habilitado) {
      this.mostrar = true;
    }
  }
}
