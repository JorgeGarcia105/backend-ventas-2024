import { Component } from '@angular/core';
import { ProductoModel } from '../../modelos/producto.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  listaRegistros: ProductoModel[] = [];

  constructor() { }

  
}
