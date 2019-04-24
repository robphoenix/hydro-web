import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogotypeLinkComponent } from './logotype-link.component';

describe('LogotypeLinkComponent', () => {
  let component: LogotypeLinkComponent;
  let fixture: ComponentFixture<LogotypeLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogotypeLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogotypeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
