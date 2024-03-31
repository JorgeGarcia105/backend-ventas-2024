import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ItemMenuModel } from '../../../modelos/item.menu.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

declare const iniciarMenuLateral: any;

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  listaMenus: ItemMenuModel[] = [];

  constructor(
    private servicioSeguridad: SeguridadService,
  ) { }

  ngOnInit(): void {
    this.listaMenus = this.servicioSeguridad.ObtenerItemsMenuLateral();
    iniciarMenuLateral();
  }
}
