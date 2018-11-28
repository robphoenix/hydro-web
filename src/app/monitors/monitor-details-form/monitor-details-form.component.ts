import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monitor-details-form',
  templateUrl: './monitor-details-form.component.html',
  styleUrls: ['./monitor-details-form.component.scss'],
})
export class MonitorDetailsFormComponent implements OnInit {
  isLinear = true;
  detailsFormGroup: FormGroup;
  categoriesFormGroup: FormGroup;
  eplFormGroup: FormGroup;
  actionsFormGroup: FormGroup;
  groupsFormGroup: FormGroup;

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
    this.detailsFormGroup = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
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
