import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;

  constructor( 
    private http: HttpClient
    ) { 
    //this.validacionDeSesion();
  }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario validado
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave
    });
  }

  /**
   * Almacena los datos del Usuario
   * @param datos del usuario
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel) {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem('datos-usuario');
    if(datosLS) {
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  /**
   * Bsuca los datos en LoacalStorage de un usuario
   * @returns datos del usuario
   */
  ObtenerDatosUsuarioLS():UsuarioModel | null{
    let datosLS = localStorage.getItem('datos-usuario');
    if(datosLS) {
      let datos = JSON.parse(datosLS);
      return datos;
    } else {
      return null;
    }
  }
  
  /**
   * Validar documentacion 2FA
   * @param idUsuario 
   * @param codigo 
   * @returns 
   */
  ValidarCodigo2FA(idUsuario: string, codigo: string): Observable<UsuarioValidadoModel> {
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificacion-2fa`, {
      usuarioId: idUsuario,
      correo2fa: codigo
    });
  }

  /**
   * Guarda en localStorage los datos del usuario validado
   * @param datos del usuario validado
   * @returns respuesta
   */
  AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem('datos-sesion');
    if(datosLS) {
      return false;
    } else {
      let datosString = JSON.stringify(datos);
      localStorage.setItem('datos-sesion', datosString);
      return true;
    }
  }

  /**
   * Guarda en LocalStorage los datos del usuario validado
   * @param datos del usuario validado
   * @returns respuesta
   */
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  ObternerDatosSesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  /*validacionDeSesion() {
    let ls = localStorage.getItem('datos-sesion');
    if(ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
    }
  }

  ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }*/
}
