import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OtherCreditsDebitsPage } from './other-credits-debits-page.component';

describe('OtherCreditsDebitsPage', () => {
  let component: OtherCreditsDebitsPage;
  let fixture: ComponentFixture<OtherCreditsDebitsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherCreditsDebitsPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
            data: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherCreditsDebitsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
