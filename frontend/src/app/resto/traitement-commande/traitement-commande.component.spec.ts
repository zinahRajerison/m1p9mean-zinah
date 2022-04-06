import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementCommandeComponent } from './traitement-commande.component';

describe('TraitementCommandeComponent', () => {
  let component: TraitementCommandeComponent;
  let fixture: ComponentFixture<TraitementCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
