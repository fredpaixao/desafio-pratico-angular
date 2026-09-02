import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EntryModalComponent } from './entry-modal.component';

describe('EntryModal', () => {
  let component: EntryModalComponent;
  let fixture: ComponentFixture<EntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryModalComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
            data: of({})
          }
        },
        {
          provide: MatDialogRef,
          useValue: { close: () => {} }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
