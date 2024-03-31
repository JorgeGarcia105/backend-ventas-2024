import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { ProductoModel } from '../modelos/producto.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../config/configuracion.paginacion';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.urlBase}producto?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }
}
