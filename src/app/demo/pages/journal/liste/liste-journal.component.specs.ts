import { ComponentFixture, TestBed } from '@angular/core/testing';
import SaisieJournalCompoment from './liste-journal.component';


describe('TblBootstrapComponent', () => {
  let component: SaisieJournalCompoment;
  let fixture: ComponentFixture<SaisieJournalCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieJournalCompoment],
    }).compileComponents();

    fixture = TestBed.createComponent(SaisieJournalCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
