import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-validar-hash-usuario-publico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SeguridadService
  ],
  templateUrl: './validar-hash-usuario-publico.component.html',
  styleUrl: './validar-hash-usuario-publico.component.css'
})
export class ValidarHashUsuarioPublicoComponent {
  
  validado = false;
  hash: string = '';

  constructor(
    private servicioSeguridad: SeguridadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hash = this.route.snapshot.params["hash"];
    this.ValidarHash();
  }

  /**
   * Metodo de validacion de hash
   */
  ValidarHash() {
    this.servicioSeguridad.ValidarHashUsuarioPublico(this.hash).subscribe({
      next: (respuesta: boolean) => {
        this.validado = respuesta;
      },
      error: (error: any) => {

      }
    })
  }
}
