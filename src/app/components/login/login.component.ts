import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

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
          this.router.navigate(['/painel']);

        } else if (perfilUsuario === 'SECRETARIA' || perfilUsuario === 'PEDAGOGICO') {
          this.router.navigate(['/admin']);

        } else {
          console.error('Perfil desconhecido:', perfilUsuario);
          alert('Erro de permissão. Contate o suporte.');
        }

      },
      error: (err) => {
        console.error("Erro ao fazer login ", err);
      }
    })
  }

}
