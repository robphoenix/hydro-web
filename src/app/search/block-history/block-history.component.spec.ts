import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHistoryComponent } from './block-history.component';
import { HydroMaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BlockHistoryComponent', () => {
  let component: BlockHistoryComponent;
  let fixture: ComponentFixture<BlockHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HydroMaterialModule, NoopAnimationsModule],
      declarations: [BlockHistoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
