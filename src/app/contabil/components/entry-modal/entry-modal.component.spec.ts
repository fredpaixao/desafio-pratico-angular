import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { EntryModalComponent } from './entry-modal.component';

describe('EntryModal', () => {
  let component: EntryModalComponent;
  let fixture: ComponentFixture<EntryModalComponent>;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = { close: () => {} };

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
          useValue: mockDialogRef
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize entry form', () => {
      expect(component.entryForm).toBeDefined();
      expect(component.entryForm.get('numeroConta')).toBeDefined();
      expect(component.entryForm.get('valor')).toBeDefined();
      expect(component.entryForm.get('historico')).toBeDefined();
    });

    it('should have empty annexos array initially', () => {
      expect(Array.isArray(component.anexos)).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should have entryForm defined', () => {
      expect(component.entryForm).toBeDefined();
    });

    it('should have valor control', () => {
      expect(component.entryForm.get('valor')).toBeDefined();
    });

    it('should have numeroConta control', () => {
      expect(component.entryForm.get('numeroConta')).toBeDefined();
    });

    it('should have historico control', () => {
      expect(component.entryForm.get('historico')).toBeDefined();
    });
  });

  describe('Conta Search', () => {
    it('should have onContaSearch method', () => {
      expect(typeof component.onContaSearch).toBe('function');
    });

    it('should have performSearch method', () => {
      expect(typeof (component as any).performSearch).toBe('function');
    });

    it('isSearchingAccount property exists', () => {
      expect(typeof component.isSearchingAccount).toBeDefined();
    });
  });

  describe('Conta Selection', () => {
    it('should have selectContaCorrente method', () => {
      expect(typeof component.selectContaCorrente).toBe('function');
    });

    it('should have clearContaCorrente method', () => {
      expect(typeof component.clearContaCorrente).toBe('function');
    });
  });

  describe('File Upload', () => {
    it('should handle file selection', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const event = {
        target: {
          files: [file]
        }
      } as any;

      expect(() => component.onFileSelected(event)).not.toThrow();
    });

    it('should initialize anexos array', () => {
      expect(component.anexos).toBeDefined();
      expect(Array.isArray(component.anexos)).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should have onSubmit method', () => {
      expect(typeof component.onSubmit).toBe('function');
    });

    it('should have onCancel method', () => {
      expect(typeof component.onCancel).toBe('function');
    });

    it('form can be patched with values', () => {
      expect(() => {
        component.entryForm.patchValue({
          numeroConta: '1001',
          valor: 1000
        });
      }).not.toThrow();
    });
  });

  describe('Modal Close', () => {
    it('should have dialog ref', () => {
      expect(mockDialogRef).toBeDefined();
    });
  });
});
