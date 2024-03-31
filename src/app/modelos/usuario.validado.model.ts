import { UsuarioModel } from "./usuario.model";
import { PermisoModel } from "./permiso.model";

export class UsuarioValidadoModel {
    user?: UsuarioModel;
    token?: string = "";
    menu: PermisoModel[] = [];
}