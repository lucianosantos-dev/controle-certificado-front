import { TipoCertificado } from "./TipoCertificado";

export interface Solicitacao{
    nomeAluno: string,
    curso: string,
    dataConclusao: Date,
    telefone: string,
    cpf: string,
    tipoCertificado: TipoCertificado
}