import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitorDefinitionFormgroupComponent } from '../monitor-definition-formgroup/monitor-definition-formgroup.component';
import { MonitorCategoriesFormgroupComponent } from '../monitor-categories-formgroup/monitor-categories-formgroup.component';

@Component({
  selector: 'app-monitor-details-form',
  templateUrl: './monitor-details-form.component.html',
  styleUrls: ['./monitor-details-form.component.scss'],
})
export class MonitorDetailsFormComponent implements OnInit {
  isLinear = false;
  eplFormGroup: FormGroup;
  actionsFormGroup: FormGroup;
  groupsFormGroup: FormGroup;

  @ViewChild(MonitorDefinitionFormgroupComponent)
  definitionFormGroup: MonitorDefinitionFormgroupComponent;

  @ViewChild(MonitorCategoriesFormgroupComponent)
  categoriesFormGroup: MonitorCategoriesFormgroupComponent;

  get fromDefinition() {
    return this.definitionFormGroup
      ? this.definitionFormGroup.definitionFormGroup
      : null;
  }

  get fromCategories() {
    return this.categoriesFormGroup
      ? this.categoriesFormGroup.categoriesFormGroup
      : null;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.eplFormGroup = this.fb.group({
      eplQuery: ['', Validators.required],
    });
    this.actionsFormGroup = this.fb.group({});
    this.groupsFormGroup = this.fb.group({});
  }
}
