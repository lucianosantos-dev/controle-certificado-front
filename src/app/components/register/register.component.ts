import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importado o ReactiveFormsModule
import { PerfilUsuario } from '../../model/PerfilUsuario';
import { AuthService } from '../../services/auth';

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

  perfis = Object.values(PerfilUsuario);


  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]], 
    email: ['', [Validators.required, Validators.email]],
    username:['', [Validators.required, Validators.minLength(3)]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    perfil: ['', [Validators.required]]
  })

  onSubmit(){
    if(this.cadastroForm.valid){
      this.authService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next:(res)=>{
          alert("Usuario cadastrado" + res);
          this.cadastroForm.reset();
        },
        error:(err)=>{
          console.error("Erro ao cadastrar usuario "+ err);
        }
      })
    }else{
      this.cadastroForm.markAllAsTouched(); 
    }
  }
}