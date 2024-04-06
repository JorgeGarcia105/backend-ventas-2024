import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { HttpClient } from '@angular/common/http';
import { PermisoModel } from '../modelos/permiso.model';
import { ItemMenuModel } from '../modelos/item.menu.model';
import { ConfiguracionMenuLateral } from '../config/configuracion.menu.lateral';
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
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS) {
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  /**
   * Cerrando sesion
   */
  RemoverDatosUsuarioValidado() {
    let datosUsuario = localStorage.getItem("datos-usuario");
    let datosSesion = localStorage.getItem("datos-sesion");
    if(datosUsuario && datosSesion) {
      localStorage.removeItem("datos-usuario");
      localStorage.removeItem("datos-sesion");
    }
    this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
  }

  /**
   * Busca los datos en LoacalStorage de un usuario
   * @returns datos del usuario
   */
  ObtenerDatosUsuarioLS():UsuarioModel | null{
    let datosLS = localStorage.getItem("datos-usuario");
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
  ValidarCodigo2FA(idUsuario:string, codigo:string): Observable<UsuarioValidadoModel> {
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificacion-2fa`, {
      usuarioId: idUsuario,
      codigo2fa: codigo
    });
  }

  /**
   * Registrar usuario publico
   * @param datos del usuario 
   * @returns datos del usuario
   */
  RegistrarUsuarioPublico(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos);
  }

  /**
   * Validar hash de usuario publico
   * @param hash para validar usuario
   * @returns hash
   */
  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario`, {
      hash: hash
    });
  }

  /**
   * Guarda en localStorage los datos del usuario validado
   * @param datos del usuario validado
   * @returns respuesta
   */
  AlmacenarDatosUsuarioValidado(datos:UsuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem("datos-sesion");
    if(datosLS != null) {
      return false;
    } else {
      let datosString = JSON.stringify(datos);
      localStorage.setItem("datos-sesion", datosString);
      this.ActualizarComportamientoUsuario(datos);  
      return true;
    }
  }

  RecuperarClavePorUsuario(usuario: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`, {
      correo: usuario
    });
  }

  /**
   * Guarda en LocalStorage los datos del usuario validado
   * @param datos del usuario validado
   * @returns respuesta
   */
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  /**
   * Obtiene los datos del usuario validado
   * @returns datos del usuario validado
   */
  ObternerDatosSesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  /**
   * Validar sesion
   */
  validacionDeSesion(): UsuarioValidadoModel | null{
    let ls = localStorage.getItem("datos-sesion");
    if(ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario;
    }
    return null;
  }

  /**
   * Actualiza el comportamiento del usuario
   * @param datos del usuario validado
   */
  ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }

  /**
   * Obtiene los permisos del usuario
   * @param idUsuario 
   * @returns permisos del usuario
   */
  ConstruirMenuLateral(permisos: PermisoModel[]){
    let menu: ItemMenuModel[] = [];

    permisos.forEach(permiso => {

      let datosRuta = ConfiguracionMenuLateral.listaMenus.filter(x => x.id == permiso.menuId);

      if(datosRuta.length > 0) {
        let item = new ItemMenuModel();
        item.idMenu = permiso.menuId;
        item.ruta = datosRuta[0].ruta;
        item.icono = datosRuta[0].icono;
        item.texto = datosRuta[0].texto;
        menu.push(item);
      }
    }); 

    this.AlmacenarItemsMenuLateral(menu);
  }

  /**
   * Almacena los items del menu lateral
   * @param itemsMenu  items del menu lateral
   */
  AlmacenarItemsMenuLateral(itemsMenu: ItemMenuModel[]) {
    let menuStr = JSON.stringify(itemsMenu);
    localStorage.setItem("menu-lateral", menuStr);
  }

  /**
   * Obtiene los items del menu lateral
   * @returns items del menu lateral
   */
  ObtenerItemsMenuLateral(): ItemMenuModel[] {
    let menu: ItemMenuModel[] = [];
    let menuStr = localStorage.getItem("menu-lateral");
    if(menuStr) {
      menu = JSON.parse(menuStr);
    } 
    return menu;
  }

  /**
   * Obtiene el token del LocalStorage
   * @returns token del LocalStorage
   */
  ObternerTokenLocalStorage(): string {
    let ls = localStorage.getItem("datos-sesion");
    if(ls) {
      let usuario: UsuarioValidadoModel = JSON.parse(ls);
      return usuario.token!;
    } else {
      return "";
    }
  }
}
