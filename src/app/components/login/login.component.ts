import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Solicitacao } from '../../services/solicitacao';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private service = inject(AuthService);
  private router = inject(Router);
  private solicitacaoService = inject(Solicitacao);

  loginForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(5)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        const perfilUsuario = localStorage.getItem('perfil');

        if (perfilUsuario === 'ALUNO') {
          this.solicitacaoService.getSolicitacoes().subscribe({
            next: (res) => {
              if (res && res.length > 0) {
                this.router.navigate(['/minhas-solicitacoes']);
              } else {
                this.router.navigate(['/painel']);
              }
            },
            error: () => {
              this.router.navigate(['/painel']);
            }
          });
        } else if (perfilUsuario === 'SECRETARIA' || perfilUsuario === 'PEDAGOGICO') {
          this.router.navigate(['/admin']);
        } else {
          Swal.fire({
            title: 'Ops!',
            text: 'Erro de permissão. Contate o suporte.',
            icon: 'warning',
            confirmButtonColor: '#d33'
          });
        }
      },
      error: (err) => {
        console.error("Erro ao fazer login ", err);
        Swal.fire({
          title: 'Acesso Negado!',
          text: 'Usuário ou senha incorretos. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    })
  }

  irParaCadastro() {
    this.router.navigate(['/register']);
  }
}