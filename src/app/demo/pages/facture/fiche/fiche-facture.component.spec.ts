import { ComponentFixture, TestBed } from '@angular/core/testing';
import FicheFactureCompoment from './fiche-facture.component';


describe('TblBootstrapComponent', () => {
  let component: FicheFactureCompoment;
  let fixture: ComponentFixture<FicheFactureCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheFactureCompoment],
    }).compileComponents();

    fixture = TestBed.createComponent(FicheFactureCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
