import { ComponentFixture, TestBed } from '@angular/core/testing';

import Suivi_tacheComponent from './suivi_tache.component'; 

describe('Suivi_tacheComponent', () => {
  let component: Suivi_tacheComponent;
  let fixture: ComponentFixture<Suivi_tacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Suivi_tacheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Suivi_tacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
