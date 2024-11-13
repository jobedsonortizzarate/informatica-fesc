import { AuthRoutingModule } from './auth-routing.module';
/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';


@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,

  ],
  providers: [],
  declarations: [
    AuthComponent,
    InicioComponent,
    RegistroUsuarioComponent
  ],
  exports: [],
})
export class AuthModule {}
