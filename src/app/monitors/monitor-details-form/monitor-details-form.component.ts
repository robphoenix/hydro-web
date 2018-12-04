import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitorDefinitionFormgroupComponent } from '../monitor-definition-formgroup/monitor-definition-formgroup.component';
import { MonitorCategoriesFormgroupComponent } from '../monitor-categories-formgroup/monitor-categories-formgroup.component';
import { IMonitor } from '../monitor';

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
  monitor: IMonitor = {} as IMonitor;

  sql = `SELECT sip,uri,stk,count(*) as hits
FROM bettingslip.win:time(1 second)
WHERE sip LIKE "59.18.235.248"
AND stk LIKE "67E97760D8C16FC79FC64FE196C99D18000004"
GROUP BY uri`;

  @ViewChild(MonitorDefinitionFormgroupComponent)
  definitionFormGroup: MonitorDefinitionFormgroupComponent;

  @ViewChild(MonitorCategoriesFormgroupComponent)
  categoriesFormGroup: MonitorCategoriesFormgroupComponent;

  get fromDefinition() {
    const {
      name,
      status,
      description,
    } = this.definitionFormGroup.definitionFormGroup.value;
    this.monitor.name = name;
    this.monitor.description = description;

    return this.definitionFormGroup
      ? this.definitionFormGroup.definitionFormGroup
      : null;
  }

  get fromCategories() {
    const { categories } = this.categoriesFormGroup.categoriesFormGroup.value;
    this.monitor.categories = categories;

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
