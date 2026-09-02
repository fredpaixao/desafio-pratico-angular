import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent, ColumnConfig } from './data-table.component';
import { CurrencyBrPipe } from '../../pipes/currency-br.pipe';

describe('DataTableComponent', () => {
  let component: DataTableComponent<any>;
  let fixture: ComponentFixture<DataTableComponent<any>>;

  interface MockItem {
    id: number;
    name: string;
    value: number;
    date: string;
  }

  const mockData: MockItem[] = [
    { id: 1, name: 'Item 1', value: 1000, date: '2026-01-01' },
    { id: 2, name: 'Item 2', value: 2500, date: '2026-01-02' },
    { id: 3, name: 'Item 3', value: 5000, date: '2026-01-03' },
  ];

  const mockColumns: ColumnConfig[] = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Nome', type: 'text' },
    { key: 'value', label: 'Valor', type: 'currency' },
    { key: 'date', label: 'Data', type: 'date' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, CurrencyBrPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent<MockItem>);
    component = fixture.componentInstance;
    component.dataSource = mockData;
    component.columns = mockColumns;
    component.displayColumns = ['id', 'name', 'value', 'date'];
    component.enableSelection = true;
    component.identifierKey = 'id';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumnsWithSelection with checkbox column', () => {
    fixture.detectChanges();
    expect(component.displayedColumnsWithSelection).toContain('checkbox');
    expect(component.displayedColumnsWithSelection).toContain('id');
  });

  it('should select all rows when onSelectAll is called with checked=true', () => {
    fixture.detectChanges();
    const event = { target: { checked: true } };
    component.onSelectAll(event);

    expect(component.selectedItems.size).toBe(mockData.length);
    expect(component.isAllSelected).toBe(true);
  });

  it('should deselect all rows when onSelectAll is called with checked=false', () => {
    fixture.detectChanges();
    component.selectedItems.add(1);
    component.selectedItems.add(2);

    const event = { target: { checked: false } };
    component.onSelectAll(event);

    expect(component.selectedItems.size).toBe(0);
    expect(component.isAllSelected).toBe(false);
  });

  it('should select a single row', () => {
    fixture.detectChanges();
    const event = { target: { checked: true } };
    component.onSelectRow(mockData[0], event);

    expect(component.selectedItems.has(1)).toBe(true);
  });

  it('should deselect a single row', () => {
    fixture.detectChanges();
    component.selectedItems.add(1);

    const event = { target: { checked: false } };
    component.onSelectRow(mockData[0], event);

    expect(component.selectedItems.has(1)).toBe(false);
  });

  it('should check if row is selected', () => {
    fixture.detectChanges();
    component.selectedItems.add(1);

    expect(component.isRowSelected(mockData[0])).toBe(true);
    expect(component.isRowSelected(mockData[1])).toBe(false);
  });

  it('should emit selectionChange with selected items', () => {
    let emittedSelection: MockItem[] = [];
    component.selectionChange.subscribe((selected) => {
      emittedSelection = selected;
    });

    fixture.detectChanges();
    const event = { target: { checked: true } };
    component.onSelectRow(mockData[0], event);

    expect(emittedSelection.length).toBe(1);
    expect(emittedSelection[0].id).toBe(1);
  });

  it('should emit rowClick event when row is clicked', () => {
    return new Promise<void>((resolve) => {
      component.rowClick.subscribe((row: MockItem) => {
        expect(row.id).toBe(mockData[0].id);
        resolve();
      });

      fixture.detectChanges();
      const event = { target: { type: 'td' } };
      component.onRowClick(mockData[0], event);
    });
  });

  it('should not emit rowClick when checkbox is clicked', () => {
    let emitted = false;
    component.rowClick.subscribe(() => {
      emitted = true;
    });

    fixture.detectChanges();
    const event = { target: { type: 'checkbox' } };
    component.onRowClick(mockData[0], event);

    expect(emitted).toBe(false);
  });

  it('should get column value for currency type', () => {
    fixture.detectChanges();
    const value = component.getColumnValue(mockData[0], mockColumns[2]);
    expect(value).toBe(1000);
  });

  it('should get column value for number type', () => {
    fixture.detectChanges();
    const value = component.getColumnValue(mockData[0], mockColumns[0]);
    expect(value).toBe(1);
  });

  it('should get column value for text type', () => {
    fixture.detectChanges();
    const value = component.getColumnValue(mockData[0], mockColumns[1]);
    expect(value).toBe('Item 1');
  });

  it('should get column value for date type', () => {
    fixture.detectChanges();
    const value = component.getColumnValue(mockData[0], mockColumns[3]);
    expect(value instanceof Date).toBe(true);
  });

  it('should update isAllSelected when all items are selected', () => {
    fixture.detectChanges();
    component.selectedItems.add(1);
    component.selectedItems.add(2);
    component.selectedItems.add(3);

    component.ngOnChanges();

    expect(component.isAllSelected).toBe(true);
  });

  it('should have isLoading property', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should render loading state when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingContainer = fixture.nativeElement.querySelector('.loading-container');
    expect(loadingContainer).toBeTruthy();
  });

  it('should render empty state when no data', () => {
    component.dataSource = [];
    component.isLoading = false;
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should update displayColumns on ngOnChanges', () => {
    fixture.detectChanges();
    component.displayColumns = ['id', 'name'];
    component.ngOnChanges();

    expect(component.displayedColumnsWithSelection).toContain('id');
    expect(component.displayedColumnsWithSelection).toContain('name');
  });

  it('should handle empty dataSource gracefully', () => {
    component.dataSource = [];
    fixture.detectChanges();

    expect(component.isAllSelected).toBe(false);
    expect(component.selectedItems.size).toBe(0);
  });

  it('should not show checkbox column when enableSelection is false', () => {
    component.enableSelection = false;
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.displayedColumnsWithSelection).not.toContain('checkbox');
  });

  it('should use custom identifierKey for row identification', () => {
    component.identifierKey = 'id';
    fixture.detectChanges();

    const event = { target: { checked: true } };
    component.onSelectRow(mockData[0], event);

    expect(component.selectedItems.has(mockData[0].id)).toBe(true);
  });
});
