import { Curso } from "./Curso";
import { TipoCertificado } from "./TipoCertificado";

export interface Solicitacao{
    nomeAluno: string;
    curso:Curso;
    dataConclusao: Date;
    telefone: string;
    cpf: string;
    tipoCertificado: TipoCertificado;
    financeiroOk: boolean;
}