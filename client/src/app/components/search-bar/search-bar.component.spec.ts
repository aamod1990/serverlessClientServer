import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to apply the initial value
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when onSearch is called', () => {
    spyOn(component.search, 'emit');

    component.searchTerm = 'Test Movie';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('Test Movie');
  });

  it('should call onSearch when search button is clicked', () => {
    spyOn(component, 'onSearch');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();

    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should bind searchTerm to input value', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'Test Movie';
    input.dispatchEvent(new Event('input'));

    expect(component.searchTerm).toBe('Test Movie');
  });
});
