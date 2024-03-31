import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';

@Component({
  selector: 'app-resgistro-publico-usuarios',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './resgistro-publico-usuarios.component.html',
  styleUrl: './resgistro-publico-usuarios.component.css'
})
export class ResgistroPublicoUsuariosComponent {

  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  /**
   * ConstruirFormulario
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(3)]],
      segundoNombre: ['', [Validators.required, Validators.minLength(3)]],
      primerApellido: ['', [Validators.required, Validators.minLength(3)]],
      segundoApellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  /**
   * RegistrarUsuario
   */
  Registrarse() {
    let campos = this.ObtenerFormGrop;
    let datos = {
      primerNombre: campos['primerNombre'].value,
      segundoNombre: campos['segundoNombre'].value,
      primerApellido: campos['primerApellido'].value,
      segundoApellido: campos['segundoApellido'].value,
      correo: campos['correo'].value,
      celular: campos['telefono'].value
    }
    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next: (respuesta: UsuarioModel) => {
        alert('registro exitoso, se ha enviado un mensaje para validar su correo')
      },
      error: (error) => {
        alert('se ha producido un error al registrar el usuario')
      }
    });
  }

  get ObtenerFormGrop() {
    return this.fGroup.controls;
  }
}
