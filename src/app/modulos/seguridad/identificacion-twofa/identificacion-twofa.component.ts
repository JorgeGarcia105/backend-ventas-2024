import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {

  usuarioId: string = '';
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioLS();
    if(datos !== null) {
      this.usuarioId = datos._id!;
      this.ContruirFormulario();
    } else {
      this.router.navigate(['/seguridad/identificar-usuario']);
    }
  }

  /**
   * Construir Formulario
   */
  ContruirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  /**
   * Validar Código 2FA
   */
  ValidarCodigo2fa() {
    if(this.fGroup.invalid) {
      alert('Debe ingresar el código 2FA');
    } else {
      let codigo2fa = this.ObtenerFormGrop['codigo'].value;
      this.servicioSeguridad.ValidarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
        next: (datos: UsuarioValidadoModel) => {
          console.log(datos);
          if(datos.token != null && datos.token != '' && datos.token != undefined) {
            this.servicioSeguridad.ConstruirMenuLateral(datos.menu);
            this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos);
            this.router.navigate([""]);
          } else {
            alert('Código 2FA incorrecto');
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  get ObtenerFormGrop() {
    return this.fGroup.controls;
  }
}
