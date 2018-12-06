import { MatTableDataSource } from '@angular/material';
import {
  IBlockHistory,
  ICrossReference,
  IGeolocationData,
} from './../search-data';
import { DictionarySearchService } from './../dictionary-search.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchParameter } from '../search-parameter';

@Component({
  selector: 'app-dictionary-result',
  templateUrl: './dictionary-result.component.html',
  styleUrls: ['./dictionary-result.component.scss'],
})
export class DictionaryResultComponent implements OnInit {
  value: String;
  type: SearchParameter;
  geolocationData: IGeolocationData;
  blockHistory = new MatTableDataSource<IBlockHistory>();
  crossReference = new MatTableDataSource<ICrossReference>();
  constructor(
    private route: ActivatedRoute,
    private searchService: DictionarySearchService,
  ) {}

  ngOnInit() {
    // this.getSearchResult();
  }

  // getSearchResult() {
  //   this.route.paramMap.subscribe((params) => {
  //     this.value = params.get('value');
  //     this.type = SearchParameter[params.get('type')];
  //     this.searchService.getMockSearch().subscribe((result) => {
  //       this.blockHistory.data = result.blockHistory;
  //       this.crossReference.data = result.crossReference;
  //       this.geolocationData = result.geolocationData;
  //     });
  //   });
  // }
}
