import { PerfilUsuario } from "./PerfilUsuario";

export interface Usuario{
    nome: string,
    email: string,
    username: string,
    senha: string,
    perfil: PerfilUsuario
}