import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionplatComponent } from './gestionplat.component';

describe('GestionplatComponent', () => {
  let component: GestionplatComponent;
  let fixture: ComponentFixture<GestionplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
