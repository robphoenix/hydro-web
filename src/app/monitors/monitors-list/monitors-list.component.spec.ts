import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../pipes/filter.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorsListComponent } from './monitors-list.component';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonitorsListComponent', () => {
  let component: MonitorsListComponent;
  let fixture: ComponentFixture<MonitorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [MonitorsListComponent, FilterPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
