import { AdminRoutingModule } from './admin-routing.module';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbCarouselModule
  ],
  providers: [CurrencyPipe, DatePipe, DecimalPipe],
  declarations: [
    AdminComponent,
    QuienessomosComponent,
  ],
  exports: [],
})
export class AdminModule {}
