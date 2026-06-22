import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/solicitacao';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-minhassolicitacoes',
  imports: [DatePipe],
  templateUrl: './minhassolicitacoes.html',
  styleUrl: './minhassolicitacoes.css',
})
export class Minhassolicitacoes implements OnInit {
  private router = inject(Router);
  private service = inject(Solicitacao);
  private cdr = inject(ChangeDetectorRef);

  nomeUsuario: string = '';
  minhasSolicitacoes: any[] = [];

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('meuUsuario');

    if (nomeSalvo) {
      this.nomeUsuario = nomeSalvo;
    }
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    this.service.getSolicitacoes().subscribe({
      next: (res) => {
        console.log('Dados recebidos na tela: ', res);
        this.minhasSolicitacoes = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erro ao carregar solicitacoes", err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar a sua lista de solicitações.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    })
  }

  novaSolicitacao() {
    this.router.navigate(['/painel']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}