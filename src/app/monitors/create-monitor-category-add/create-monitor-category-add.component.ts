import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hydro-create-monitor-category-add',
  templateUrl: './create-monitor-category-add.component.html',
  styleUrls: ['./create-monitor-category-add.component.scss'],
})
export class CreateMonitorCategoryAddComponent implements OnInit {
  constructor() {}

  public onAddCategory() {
    console.log(`add`);
  }

  ngOnInit() {}
}
