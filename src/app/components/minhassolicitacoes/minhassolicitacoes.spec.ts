import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minhassolicitacoes } from './minhassolicitacoes';

describe('Minhassolicitacoes', () => {
  let component: Minhassolicitacoes;
  let fixture: ComponentFixture<Minhassolicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minhassolicitacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minhassolicitacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
