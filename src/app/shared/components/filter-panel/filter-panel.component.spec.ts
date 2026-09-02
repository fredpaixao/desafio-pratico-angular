import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FilterPanelComponent } from './filter-panel.component';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanelComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;

    const fb = TestBed.inject(FormBuilder);
    component.formGroup = fb.group({
      test: [''],
    });

    component.title = 'Test Filters';
    component.subtitle = 'Test Subtitle';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchClicked when onSearch is called', () => {
    spyOn(component.searchClicked, 'emit');
    component.onSearch();
    expect(component.searchClicked.emit).toHaveBeenCalled();
  });

  it('should emit clearClicked when onClear is called', () => {
    spyOn(component.clearClicked, 'emit');
    component.onClear();
    expect(component.clearClicked.emit).toHaveBeenCalled();
  });

  it('should display title and subtitle', () => {
    const titleElement = fixture.nativeElement.querySelector('.filter-title');
    const subtitleElement = fixture.nativeElement.querySelector('.filter-subtitle');

    expect(titleElement.textContent).toContain('Test Filters');
    expect(subtitleElement.textContent).toContain('Test Subtitle');
  });
});
