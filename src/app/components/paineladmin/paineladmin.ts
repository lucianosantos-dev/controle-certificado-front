import { Component, inject, OnInit, signal } from '@angular/core';
import { Solicitacao } from '../../services/solicitacao';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paineladmin',
  imports: [DatePipe, FormsModule],
  templateUrl: './paineladmin.html',
  styleUrl: './paineladmin.css',
})
export class Paineladmin implements OnInit {
  private service = inject(Solicitacao);
  private router = inject(Router);

  filtroNome: string = '';
  filtroCpf: string = '';
  tamanhoPagina: number = 10;
  statusSelecionado: string = '';


  solicitacoes = signal<any[]>([]);
  paginaAtual = signal<number>(0);
  totalPaginas = signal<number>(0);
  modalAberto = signal<boolean>(false);
  solicitacaoSelecionada = signal<any>(null);



  ngOnInit(): void {
    this.carregarPaginas(0);
  }

  carregarPaginas(pagina: number) {
    this.service.getAll(pagina, this.tamanhoPagina, this.filtroNome, this.filtroCpf)
      .subscribe({
        next: (res) => {
          this.solicitacoes.set(res.content);
          this.paginaAtual.set(res.number)
          this.totalPaginas.set(res.totalPaginas);
        },
        error: (err) => {
          console.error("Erro ao carregar paginaçcão", err);
          Swal.fire('Erro!', 'Não foi possível carregar a lista de certificados.', 'error');
        }
      })
  }

  pesquisar() {
    this.carregarPaginas(0);
  }

  limparFiltro() {
    this.filtroNome = '';
    this.filtroCpf = '';
    this.carregarPaginas(0);
  }

  paginaAnterior() {
    if (this.paginaAtual() > 0) {
      this.carregarPaginas(this.paginaAtual() - 1);
    }
  }

  proximaPagina() {
    if (this.paginaAtual() < this.totalPaginas() - 1) {
      this.carregarPaginas(this.paginaAtual() + 1);
    }
  }

  abrirDetalhes(solicitacao: any) {
    this.solicitacaoSelecionada.set(solicitacao);
    this.statusSelecionado = solicitacao.statusSelecionado;
    this.modalAberto.set(true);
  }

  fecharModal() {
    this.modalAberto.set(false);
    this.solicitacaoSelecionada.set(null);
  }

  salvarNovoStatus() {
    const id = this.solicitacaoSelecionada().id;

    this.service.atualizarStatus(id, this.statusSelecionado).subscribe({
      next: (res) => {
        Swal.fire('Sucesso!', 'O status foi atualizado', 'success');
        this.fecharModal();
        this.carregarPaginas(this.paginaAtual());
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erro!', 'não foi possível atualizar o status.', 'error');
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
