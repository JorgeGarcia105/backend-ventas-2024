import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ProductoService } from '../../../../servicios/parametros/producto.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listar-producto',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {

  listaRegistros:ProductoModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;  

  constructor(
    private servicio: ProductoService
  ) { }

  ngOnInit() {
    this.ListarRegistros();
  }

  /**
   * Listar registros
   */
  ListarRegistros() {
    this.servicio.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
          this.listaRegistros = datos.registros;
          this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }
}
