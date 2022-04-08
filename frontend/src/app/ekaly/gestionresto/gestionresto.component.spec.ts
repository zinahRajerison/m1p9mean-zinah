import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionrestoComponent } from './gestionresto.component';

describe('GestionrestoComponent', () => {
  let component: GestionrestoComponent;
  let fixture: ComponentFixture<GestionrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionrestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
