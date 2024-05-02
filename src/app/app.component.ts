import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PiePaginaComponent } from "./publico/pagina-maestra/pie-pagina/pie-pagina.component";
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { MenuLateralComponent } from "./publico/pagina-maestra/menu-lateral/menu-lateral.component"
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SeguridadService } from './servicios/seguridad.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptos/auth.intercepto';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      PiePaginaComponent,
      EncabezadoComponent,
      MenuLateralComponent,
      HttpClientModule,
      ReactiveFormsModule
    ],
    providers: [
      SeguridadService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppComponent {
  title = 'ventas-2024.1';
}
