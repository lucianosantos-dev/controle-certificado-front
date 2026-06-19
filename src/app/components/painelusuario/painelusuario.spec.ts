import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painelusuario } from './painelusuario';

describe('Painelusuario', () => {
  let component: Painelusuario;
  let fixture: ComponentFixture<Painelusuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Painelusuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Painelusuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
