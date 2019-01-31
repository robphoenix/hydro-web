import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-action-form-section-other',
  templateUrl: './create-action-form-section-other.component.html',
  styleUrls: ['./create-action-form-section-other.component.scss'],
})
export class CreateActionFormSectionOtherComponent implements OnInit {
  options: string[] = ['Database', 'Results Processing', 'Miscellaneous'];
  selectedOption: string;

  constructor() {}

  ngOnInit() {}
}
