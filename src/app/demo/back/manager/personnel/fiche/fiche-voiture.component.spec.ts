import { ComponentFixture, TestBed } from '@angular/core/testing';
import FicheVoitureCompoment from './fiche-voiture.component';


describe('TblBootstrapComponent', () => {
  let component: FicheVoitureCompoment;
  let fixture: ComponentFixture<FicheVoitureCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheVoitureCompoment],
    }).compileComponents();

    fixture = TestBed.createComponent(FicheVoitureCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
