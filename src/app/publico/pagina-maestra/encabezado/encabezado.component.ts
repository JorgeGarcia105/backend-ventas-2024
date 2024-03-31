import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrl: './encabezado.component.css',
    imports: [
        RouterLink,
        MenuLateralComponent,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        SeguridadService
    ]
})
export class EncabezadoComponent {

  constructor(
    private servicioSeguridad: SeguridadService
  ) { }

  sesionActiva: boolean = false;

  ngOnInit(): void {
    this.ValidarSesion();
  }

  ValidarSesion() {
    this.servicioSeguridad.ObternerDatosSesion().subscribe({
      next: (datos: UsuarioValidadoModel) => {
        if(datos.token != "") {
          this.sesionActiva = true;
        } else {
          this.sesionActiva = false;
        }
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
