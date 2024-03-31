import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    SeguridadService
  ],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
  ) { }

  ngOnInit(): void {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  /**
   * RecuperarClave
   */
  RecuperarClave() {
    if(this.fGroup.invalid) {
      alert('Debe ingresar los datos del usuario');
    } else {
      let usuario = this.ObtenerFormGrop['usuario'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next: (datos: UsuarioModel) => {
          alert('Se ha enviado una nueva contraseña como mensaje de texto al número de teléfono registrado' + datos.celular);
        },
        error: (err: any) => {
          alert('A ocurrido un error enviando la nueva contraseña al número de teléfono registrado');
        }
      })
    }
  }

  get ObtenerFormGrop() {
    return this.fGroup.controls;
  }
}
