import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherCreditsDebitsPage } from './other-credits-debits-page.component';

describe('OtherCreditsDebitsPage', () => {
  let component: OtherCreditsDebitsPage;
  let fixture: ComponentFixture<OtherCreditsDebitsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherCreditsDebitsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherCreditsDebitsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
