import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormErrorPipe } from '../pipes/form-error.pipe';
import { InputFechaComponent } from './input-fecha/input-fecha.component';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
  declarations: [
    
    MenuComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    FormErrorPipe,
    InputFechaComponent,
    WizardComponent

    
  ],
  exports: [
    SpinnerComponent,
    MenuComponent,
    ReactiveFormsModule,
    BreadcrumbsComponent,
    FormErrorPipe,
    InputFechaComponent,
    WizardComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class SharedModule {}
