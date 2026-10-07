import { Component, inject, OnInit, signal } from '@angular/core';
import { Solicitacao } from '../../services/solicitacao';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from "ngx-mask";
import { CursoService } from '../../services/curso';
import { Curso } from '../../model/Curso';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-paineladmin',
  imports: [DatePipe, FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './paineladmin.html',
  styleUrl: './paineladmin.css',
})
export class Paineladmin implements OnInit {
  private cursoService = inject(CursoService);
  private service = inject(Solicitacao);
  private router = inject(Router);
  private authService = inject(AuthService);
  

  public cursos: Curso[] = [];
  public filtroCurso: string = '';

  filtroNome: string = '';
  filtroStatus: string = 'TODOS';
  filtroCpf: string = '';
  tamanhoPagina: number = 5;
  statusSelecionado: string = '';

  isLoading = signal<boolean>(false);
  isSavingStatus = signal<boolean>(false);

  solicitacoes = signal<any[]>([]);
  paginaAtual = signal<number>(0);
  totalPaginas = signal<number>(0);
  modalAberto = signal<boolean>(false);
  solicitacaoSelecionada = signal<any>(null);

  ngOnInit(): void {
    this.filtroStatus = 'TODOS';
    this.listarCursos();
    this.carregarPaginas(0);
  }

  listarCursos() {
    this.cursoService.getCursos().subscribe({
      next: (res) => {
        this.cursos = res;
      },
      error: (err) => console.error("Erro ao carregar cursos no filtro", err)
    });
  }

  carregarPaginas(pagina: number) {
    this.isLoading.set(true);
    this.service.getAll(pagina, this.tamanhoPagina, this.filtroNome, this.filtroCpf, this.filtroStatus, this.filtroCurso)
      .subscribe({
        next: (res) => {
          this.solicitacoes.set(res.content);
          this.paginaAtual.set(res.number)
          this.totalPaginas.set(res.totalPages);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error("Erro ao carregar paginação", err);
          this.isLoading.set(false);
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
    this.filtroStatus = 'TODOS';
    this.filtroCurso = '';
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
    this.statusSelecionado = solicitacao.statusSolicitacao;
    this.modalAberto.set(true);
  }

  fecharModal() {
    this.modalAberto.set(false);
    this.solicitacaoSelecionada.set(null);
  }

  salvarNovoStatus() {
    if (this.isSavingStatus()) return;

    const id = this.solicitacaoSelecionada().id;
    this.isSavingStatus.set(true);

    this.service.atualizarStatus(id, this.statusSelecionado).subscribe({
      next: () => {
        this.isSavingStatus.set(false);
        Swal.fire({
          title: 'Sucesso!',
          text: 'O status foi atualizado',
          icon: 'success',
          customClass: {
            container: 'swal-high-zindex'
          }
        });
        this.fecharModal();
        this.carregarPaginas(this.paginaAtual());
      },
      error: (err) => {
        console.error(err);
        this.isSavingStatus.set(false);
        Swal.fire({
          title: 'Erro!',
          text: 'não foi possível atualizar o status.',
          icon: 'error',
          customClass: {
            container: 'swal-high-zindex'
          }
        });
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  novaSolicitacao() {
    this.router.navigate(['/painel']);
  }

  alterarStatusFinanceiro(solicitacao: any): void {
    if (solicitacao.financeiroOk) {
      return;
    }

    const novoStatus = true;
    const acaoTexto = 'marcar como PAGO';

    Swal.fire({
      title: 'Confirmar alteração?',
      text: `Deseja ${acaoTexto} o financeiro de ${solicitacao.nomeAluno}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, alterar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'swal-high-zindex'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.atualizarFinanceiro(solicitacao.id, novoStatus).subscribe({
          next: () => {
            solicitacao.financeiroOk = novoStatus;

            if (this.solicitacaoSelecionada()?.id === solicitacao.id) {
              this.solicitacaoSelecionada.set({ ...this.solicitacaoSelecionada(), financeiroOk: novoStatus });
            }
            this.carregarPaginas(this.paginaAtual());

            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Financeiro atualizado!',
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                container: 'swal-high-zindex'
              }
            });
          },
          error: (err) => {
            console.error(err)
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível alterar o status financeiro.',
              icon: 'error',
              customClass: {
                container: 'swal-high-zindex'
              }
            });
          }
        });
      }
    });
  }
}