import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paineladmin } from './paineladmin';

describe('Paineladmin', () => {
  let component: Paineladmin;
  let fixture: ComponentFixture<Paineladmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paineladmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paineladmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
