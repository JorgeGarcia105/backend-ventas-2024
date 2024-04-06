import { Component } from '@angular/core';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  listaRegistros:ClienteModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;                         

  constructor(
    private servicio: ClienteService
  ) { }

  ngOnInit() {
    this.ListarRegistros();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicio.listarRegistros(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos' + error);
      }
    });
  }
}
