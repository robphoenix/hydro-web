import { DictionarySearchService } from '../../search/dictionary-search.service';
import { SearchData } from '../../search/search-data';
import { DictionaryHelpDialogComponent } from './dictionary-help-dialog/dictionary-help-dialog.component';
import { ParameterType } from './../../shared/parameterType';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-search',
  templateUrl: './dictionary-search.component.html',
  styleUrls: ['./dictionary-search.component.scss']
})
export class DictionarySearchComponent implements OnInit {
  ParameterType = ParameterType;
  searchForm: FormGroup;
  searchResult: SearchData;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private searchService: DictionarySearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      value: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  onSubmit(type: String, value: String) {
    if (type && value) {
      this.router.navigate(['search', type, value]);
    }
  }

  parameterTypeValues() {
    return Object.keys(ParameterType).filter(
      type => isNaN(<any>type) && type !== 'values'
    );
  }

  openHelpDialog(): void {
    this.dialog.open(DictionaryHelpDialogComponent, {
      width: '600px'
    });
  }
}
