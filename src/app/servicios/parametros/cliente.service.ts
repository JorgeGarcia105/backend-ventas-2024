import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PaginadorClienteModel } from '../../modelos/paginador.cliente.model';
import { Observable } from 'rxjs';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { SeguridadService } from '../seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase: string = ConfiguracionRutasBackend.urlNegocio;
  token = "";

  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService 
  ) { 
    this.token = this.servicioSeguridad.ObternerTokenLocalStorage();
  }

  /**
   * Listar registros
   * @returns lista de registros
   */
  listarRegistros(pag: number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    let url = `${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}}`;
    return this.http.get<PaginadorClienteModel>(url)
  }
}
