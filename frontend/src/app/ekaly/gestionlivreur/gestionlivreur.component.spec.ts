import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionlivreurComponent } from './gestionlivreur.component';

describe('GestionlivreurComponent', () => {
  let component: GestionlivreurComponent;
  let fixture: ComponentFixture<GestionlivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionlivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionlivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
