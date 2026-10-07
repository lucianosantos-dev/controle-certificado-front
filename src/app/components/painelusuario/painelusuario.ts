import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Solicitacao } from '../../services/solicitacao';
import { TipoCertificado } from '../../model/TipoCertificado';
import Swal from 'sweetalert2';
import { NgxMaskDirective } from 'ngx-mask';
import { CursoService } from '../../services/curso';
import { Curso } from '../../model/Curso';

@Component({
  selector: 'app-painelusuario',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './painelusuario.html',
  styleUrl: './painelusuario.css',
})
export class Painelusuario implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private service = inject(Solicitacao);
  private cursoService = inject(CursoService);

  public cursos: Curso[] = [];

  isAdmin: boolean = false;
  nomeUsuario: string = '';
  tipoCertificado = Object.values(TipoCertificado);
  isSubmitting: boolean = false;

  solicitacoesForms: FormGroup = this.fb.group({
    nomeAluno: [{ value: '', disabled: true }, Validators.required],
    cursoId: ['', Validators.required],
    dataConclusao: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    tipoCertificado: ['IMPRESSO', Validators.required]
  });


  somenteNumeros(event: Event, nomeControle: string) {
    const input = event.target as HTMLInputElement;
    const valorLimpo = input.value.replace(/[^0-9]/g, '');
    this.solicitacoesForms.get(nomeControle)?.setValue(valorLimpo, { emitEvent: false });
  }

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('meuUsuario');
    this.isAdmin = localStorage.getItem('perfil') === 'PEDAGOGICO' || localStorage.getItem('perfil') === 'SECRETARIA';

    if (nomeSalvo) {
      this.nomeUsuario = nomeSalvo;
    }

    if (this.isAdmin) {
      this.solicitacoesForms.get('nomeAluno')?.enable();
    }
    else if (nomeSalvo) {
      this.nomeUsuario = nomeSalvo;
      this.solicitacoesForms.patchValue({
        nomeAluno: nomeSalvo
      });
    }

    this.listarCursos();
  }

  onSubmit() {
    if (this.solicitacoesForms.invalid) {
      this.solicitacoesForms.markAllAsTouched();

      const cursoControl = this.solicitacoesForms.get('cursoId');
      if (cursoControl?.invalid) {
        Swal.fire({
          title: '⚠️ Curso não selecionado!',
          text: 'Por favor, selecione o curso antes de enviar a solicitação.',
          icon: 'warning',
          confirmButtonColor: '#d97706',
          confirmButtonText: 'OK, vou selecionar'
        });
        return;
      }

      Swal.fire({
        title: 'Campos incompletos!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'warning',
        confirmButtonColor: '#d97706'
      });
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    this.service.enviarSolicitacao(this.solicitacoesForms.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sua solicitação de certificado foi enviada.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d97706'
        }).then((result) => {
          if (result.isConfirmed) {
            this.solicitacoesForms.reset({ tipoCertificado: 'IMPRESSO' });

            if (this.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/minhas-solicitacoes']);
              this.solicitacoesForms.patchValue({ nomeAluno: this.nomeUsuario });
            }
          }
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error("Erro ao enviar solicitacao", err);

        let mensagemErro = 'Verifique os dados preenchidos e tente novamente.';

        if (err.error && err.error.errors && err.error.errors.length > 0) {
          mensagemErro = err.error.errors[0].defaultMessage;
        }
        else if (err.error && typeof err.error === 'string') {
          mensagemErro = err.error;
        }
        else if (err.error && err.error.message) {
          mensagemErro = err.error.message;
        }

        Swal.fire({
          title: 'Atenção!',
          text: mensagemErro,
          icon: 'warning',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  voltarAdmin() {
    this.router.navigate(['/admin']);
  }

  listarCursos() {
    this.cursoService.getCursos().subscribe({
      next: (res) => {
        this.cursos = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}