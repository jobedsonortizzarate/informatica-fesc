import { Component, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'sg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  visualizarSpenner: boolean = false;

  mostrarSpenner() {
    this.visualizarSpenner = true;
  }

  cerrarSpenner() {
    this.visualizarSpenner = false;
  }
}
