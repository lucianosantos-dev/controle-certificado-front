import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-painelusuario',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './painelusuario.html',
  styleUrl: './painelusuario.css',
})
export class Painelusuario {
  private router = inject(Router);


  logout(){
    this.router.navigate(['/login']);
  }
}
