import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormModalComponent } from './form-modal.component';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModalComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;

    const fb = TestBed.inject(FormBuilder);
    component.formGroup = fb.group({
      name: [''],
      email: [''],
    });

    component.title = 'Teste Modal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitted event with form value', () => {
    let emittedValue: any;
    component.submitted.subscribe((value) => {
      emittedValue = value;
    });

    component.formGroup.patchValue({
      name: 'João',
      email: 'joao@example.com',
    });

    component.onSubmit();

    expect(emittedValue).toEqual({
      name: 'João',
      email: 'joao@example.com',
    });
  });

  it('should not emit submitted event if form is invalid', () => {
    let emittedValue: any = null;
    component.submitted.subscribe((value) => {
      emittedValue = value;
    });

    component.formGroup.setErrors({ invalid: true });

    component.onSubmit();

    expect(emittedValue).toBeNull();
  });

  it('should emit cancelled event', () => {
    let cancelledEmitted = false;
    component.cancelled.subscribe(() => {
      cancelledEmitted = true;
    });

    component.onCancel();

    expect(cancelledEmitted).toBe(true);
  });

  it('should display title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Teste Modal');
  });

  it('should disable submit button when form is invalid', () => {
    component.formGroup.setErrors({ invalid: true });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('.btn-submit');
    expect(submitButton.disabled).toBe(true);
  });

  it('should have default button texts', () => {
    expect(component.submitButtonText).toBe('Salvar');
    expect(component.cancelButtonText).toBe('Cancelar');
  });

  it('should use custom button texts', () => {
    component.submitButtonText = 'Confirmar';
    component.cancelButtonText = 'Voltar';
    fixture.detectChanges();

    expect(component.submitButtonText).toBe('Confirmar');
    expect(component.cancelButtonText).toBe('Voltar');
  });
});
