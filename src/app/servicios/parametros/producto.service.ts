import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { ProductoModel } from '../../modelos/producto.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PaginadorProductoModel } from '../../modelos/paginador.producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Listar registros
   * @returns lista de ceregistros
   */
  listarRegistros(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.urlBase}producto?filter={"limit":${ConfiguracionPaginacion.registroPorPagina}}`);
  }

  /**
   * listar registros paginados
   * @param pag recibe el número de página
   * @returns lista de registros paginados
   */
  listarRegistrosPaginados(pag: number): Observable<PaginadorProductoModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorProductoModel>(`${this.urlBase}producto-paginado?filter={"limit" ${limit}, "skip": ${skip}}`);
  }
}
