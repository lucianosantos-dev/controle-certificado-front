import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PerfilUsuario } from '../../model/PerfilUsuario';
import { AuthService } from '../../services/auth';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  perfis = Object.values(PerfilUsuario);

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    perfil: ['', [Validators.required]]
  })

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.authService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Cadastro Concluído!',
            text: 'Usuário cadastrado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#d97706'
          }).then(() => {
            this.cadastroForm.reset();
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          console.error("Erro ao cadastrar usuario " + err);
          Swal.fire({
            title: 'Ops!',
            text: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      })
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}