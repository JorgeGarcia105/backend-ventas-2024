import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import { MD5 } from 'crypto-js';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    SeguridadService
  ],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {

  fGroup: FormGroup = new FormGroup({}); 

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }

  /**
   * IdentificarUsuario
   */
  IdentificarUsuario() {
    if(this.fGroup.invalid) {
      alert('Datos incorrectos');
    } else {
      let usuario = this.obtenerFormGrop['usuario'].value;
      let clave = this.obtenerFormGrop['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad.IdentificarUsuario(usuario, claveCifrada).subscribe({
        next: (datos: UsuarioModel) => {
          console.log(datos);
          if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(datos)) {
            this.router.navigate(['/seguridad/2fa']);
          }        
        },
        error: (error:any) => {
          console.log(error);
        }
      })
    }
  }

  get obtenerFormGrop() {
    return this.fGroup.controls;
  }
}
