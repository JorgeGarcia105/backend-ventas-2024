import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component'; // Import the CambiarClaveComponent
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { ResgistroPublicoUsuariosComponent } from './resgistro-publico-usuarios/resgistro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { validarSesionActivaGuard, validarSesionInactivaGuard } from '../../guardianes/validar-sesion-activa.guard';

const routes: Routes = [
  {
    path: "identificar-usuario",
    component: IdentificacionUsuarioComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "cambiar-clave",
    component: CambioClaveComponent,
    canActivate: [validarSesionActivaGuard]
  }, {
    path: "recuperar-clave",
    component: RecuperarClaveComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "2fa",
    component: IdentificacionTwofaComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "registro-publico",
    component: ResgistroPublicoUsuariosComponent,
    canActivate: [validarSesionInactivaGuard]
  },
  {
    path: "validar-hash-usuario-publico/:hash",
    component: ValidarHashUsuarioPublicoComponent
  },
  {
    path: "usuario-crear",
    component: CrearUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-listar",
    component: ListarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-editar/:id",
    component: EditarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "usuario-eliminar/:id",
    component: EliminarUsuarioComponent,
    canActivate: [validarSesionActivaGuard]
  }
  /*{
    path: "rol-crear",
    component: CrearRolComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "rol-listar",
    component: ListarRolComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "rol-editar/:id",
    component: EditarRolComponent,
    canActivate: [validarSesionActivaGuard]
  },
  {
    path: "rol-eliminar/:id",
    component: EliminarRolComponent,
    canActivate: [validarSesionActivaGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
