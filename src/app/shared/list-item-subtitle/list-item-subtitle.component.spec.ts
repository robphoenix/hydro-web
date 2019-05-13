import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemSubtitleComponent } from './list-item-subtitle.component';

describe('ListItemSubtitleComponent', () => {
  let component: ListItemSubtitleComponent;
  let fixture: ComponentFixture<ListItemSubtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemSubtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
