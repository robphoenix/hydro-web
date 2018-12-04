import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDefinitionFormgroupComponent } from './monitor-definition-formgroup.component';

describe('MonitorDefinitionFormgroupComponent', () => {
  let component: MonitorDefinitionFormgroupComponent;
  let fixture: ComponentFixture<MonitorDefinitionFormgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDefinitionFormgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDefinitionFormgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
