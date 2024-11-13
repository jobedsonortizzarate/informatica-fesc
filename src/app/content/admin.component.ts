import { Component, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'us-admin',
  template: `
    <sg-menu></sg-menu>
    <div class="row tamaño-contenedor contenedor-principal">
      <sg-breadcrumbs style="padding:0px;"></sg-breadcrumbs>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AdminComponent implements OnChanges {
  constructor() {
    
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {}
}
