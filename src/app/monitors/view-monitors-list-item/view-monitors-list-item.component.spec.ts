import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMonitorsListItemComponent } from './view-monitors-list-item.component';

describe('ViewMonitorsListItemComponent', () => {
  let component: ViewMonitorsListItemComponent;
  let fixture: ComponentFixture<ViewMonitorsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMonitorsListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
