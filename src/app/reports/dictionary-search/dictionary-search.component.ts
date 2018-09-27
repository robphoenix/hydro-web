import { DictionarySearchService } from './../dictionary-search.service';
import { SearchData } from './../search-data';
import { DictionaryHelpDialogComponent } from './dictionary-help-dialog/dictionary-help-dialog.component';
import { ParameterType } from './../../shared/parameterType';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {} from '@angular/forms';

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
    private searchService: DictionarySearchService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      value: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  onSubmit(type: String, value: String) {
    if (type && value) {
      alert(`Submiting ${type} and ${value}`);
      this.searchService.getMockSearch().subscribe(result => {
        this.searchResult = result;
      });
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
