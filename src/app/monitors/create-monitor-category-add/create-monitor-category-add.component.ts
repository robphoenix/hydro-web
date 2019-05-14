import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { ICategory } from '../monitor';

@Component({
  selector: 'hydro-create-monitor-category-add',
  templateUrl: './create-monitor-category-add.component.html',
  styleUrls: ['./create-monitor-category-add.component.scss'],
})
export class CreateMonitorCategoryAddComponent implements OnInit {
  @Input()
  currentCategories: ICategory[];

  @Output()
  submitCategories = new EventEmitter<string[]>();

  constructor(public dialog: MatDialog) {}

  public onAddCategory() {
    const categories = this.currentCategories;
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: { categories },
      width: `400px`,
    });

    dialogRef.afterClosed().subscribe((data: string) => {
      this.submitCategories.emit(data.split(`,`).map((d: string) => d.trim()));
    });
  }

  ngOnInit() {}
}
