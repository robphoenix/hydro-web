import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormCacheWindowComponent } from './create-monitor-form-cache-window.component';

describe('CreateMonitorFormCacheWindowComponent', () => {
  let component: CreateMonitorFormCacheWindowComponent;
  let fixture: ComponentFixture<CreateMonitorFormCacheWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorFormCacheWindowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormCacheWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
