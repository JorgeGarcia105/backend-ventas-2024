import { Component } from '@angular/core';
import { ProductoModel } from '../../../../modelos/producto.model';
import { ParametrosService } from '../../../../servicios/parametros.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-producto',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent {

  listaRegistros:ProductoModel[] = [];

  constructor(
    private servicioParametros: ParametrosService
  ) { }

  ngOnInit() {
    this.servicioParametros.listarRegistros().subscribe({
      next: (datos) => {
        this.listaRegistros = datos;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }
}
