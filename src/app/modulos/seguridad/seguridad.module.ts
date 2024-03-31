import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../../servicios/seguridad.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    SeguridadService
  ]
})
export class SeguridadModule { }
