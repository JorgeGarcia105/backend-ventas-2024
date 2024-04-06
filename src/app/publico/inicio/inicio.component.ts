import { Component } from '@angular/core';
import { ProductoModel } from '../../modelos/producto.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  listaRegistros: ProductoModel[] = [];

  constructor() { }

  
}
