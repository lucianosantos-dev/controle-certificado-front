import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Solicitacao } from '../../services/solicitacao';
import { TipoCertificado } from '../../model/TipoCertificado';
import Swal from 'sweetalert2';
import { NgxMaskDirective } from 'ngx-mask';

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

  isAdmin: boolean = false;
  nomeUsuario: string = '';
  tipoCertificado = Object.values(TipoCertificado);

  solicitacoesForms: FormGroup = this.fb.group({
    nomeAluno: [{ value: '', disabled: true }, Validators.required],
    curso: ['', Validators.required],
    dataConclusao: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), Validators.pattern('^[0-9]*$')]],
    tipoCertificado: ['IMPRESSO', Validators.required]
  });

  somenteNumeros(event: Event, nomeControle: string) {
    const input = event.target as HTMLInputElement;
    const valorLimpo = input.value.replace(/[^0-9]/g, '');
    this.solicitacoesForms.get(nomeControle)?.setValue(valorLimpo, { emitEvent: false });
  }

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('meuUsuario');

    this.isAdmin = localStorage.getItem('perfil') === 'PEDAGOGICO';

    if(nomeSalvo){
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
  }

  onSubmit() {
    if (this.solicitacoesForms.invalid) return;

    this.service.enviarSolicitacao(this.solicitacoesForms.getRawValue()).subscribe({
      next: () => {
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
        console.error("Erro ao enviar solicitacao", err);
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao enviar sua solicitação. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}