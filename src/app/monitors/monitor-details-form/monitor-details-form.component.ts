import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitorDefinitionFormgroupComponent } from '../monitor-definition-formgroup/monitor-definition-formgroup.component';

@Component({
  selector: 'app-monitor-details-form',
  templateUrl: './monitor-details-form.component.html',
  styleUrls: ['./monitor-details-form.component.scss'],
})
export class MonitorDetailsFormComponent implements OnInit {
  isLinear = false;
  categoriesFormGroup: FormGroup;
  eplFormGroup: FormGroup;
  actionsFormGroup: FormGroup;
  groupsFormGroup: FormGroup;

  @ViewChild(MonitorDefinitionFormgroupComponent)
  definitionFormGroup: MonitorDefinitionFormgroupComponent;

  get fromDefinition() {
    return this.definitionFormGroup
      ? this.definitionFormGroup.definitionFormGroup
      : null;
  }

  allCategories: string[] = [
    'script-attack',
    'Mobile',
    'Sports Book',
    'JohnSnow',
    'BetSlip',
    'GavinEdwards',
    'Scrapers',
    'China Arbs',
    'bettingslip',
    'Extra',
    'FRM',
    'Alerts',
    'NewLoginDefault',
    'Members',
    'Monitor',
    'Blocking',
    'Investigation',
    'HoneyPot',
    'Publisher',
    'Datacenter',
    'LoginAttack',
    'Bookmaker',
    'hostingfacility',
    'geo',
    'Martin',
    'OpenAccount',
    'Ragbag',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.categoriesFormGroup = this.fb.group({
      categories: [[], Validators.required],
    });
    this.eplFormGroup = this.fb.group({
      eplQuery: ['', Validators.required],
    });
    this.actionsFormGroup = this.fb.group({});
    this.groupsFormGroup = this.fb.group({});
  }
}
