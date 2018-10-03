import { ISearchData } from '../search-data';
import { DictionaryHelpDialogComponent } from './../dictionary-help-dialog/dictionary-help-dialog.component';
import { SearchParameter } from '../search-parameter';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-search',
  templateUrl: './dictionary-search.component.html',
  styleUrls: ['./dictionary-search.component.scss'],
})
export class DictionarySearchComponent implements OnInit {
  SearchParameter = SearchParameter;
  searchForm: FormGroup;
  searchResult: ISearchData;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      value: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  onSubmit(type: String, value: String) {
    if (type && value) {
      this.router.navigate(['search', type, value]);
    }
  }

  searchParameterValues() {
    return Object.keys(SearchParameter).filter(
      (type) => isNaN(<any>type) && type !== 'values',
    );
  }

  openHelpDialog(): void {
    this.dialog.open(DictionaryHelpDialogComponent, {
      width: '600px',
    });
  }
}
