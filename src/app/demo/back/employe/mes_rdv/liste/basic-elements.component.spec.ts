import { ComponentFixture, TestBed } from '@angular/core/testing';

import  BasicElementsComponent  from './mes_rdv.component';

describe('BasicElementsComponent', () => {
  let component: BasicElementsComponent;
  let fixture: ComponentFixture<BasicElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});