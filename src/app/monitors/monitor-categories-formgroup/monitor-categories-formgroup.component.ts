import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-monitor-categories-formgroup',
  templateUrl: './monitor-categories-formgroup.component.html',
  styleUrls: ['./monitor-categories-formgroup.component.scss'],
})
export class MonitorCategoriesFormgroupComponent implements OnInit {
  categoriesFormGroup: FormGroup;

  @Input()
  stepper: MatStepper;

  currentCategories: string[] = [
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

  constructor(private fb: FormBuilder) {
    this.categoriesFormGroup = this.fb.group({
      categories: [[], Validators.required],
    });
  }

  ngOnInit() {}
}
