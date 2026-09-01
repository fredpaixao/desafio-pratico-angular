import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryModal } from './entry-modal';

describe('EntryModal', () => {
  let component: EntryModal;
  let fixture: ComponentFixture<EntryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
