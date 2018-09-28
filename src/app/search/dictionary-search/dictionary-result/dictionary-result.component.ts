import {
  BlockHistory,
  CrossReference,
  GeolocationData
} from './../../search-data';
import { DictionarySearchService } from './../../dictionary-search.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchData } from '../../search-data';
import { ParameterType } from '../../../shared/parameterType';

@Component({
  selector: 'app-dictionary-result',
  templateUrl: './dictionary-result.component.html',
  styleUrls: ['./dictionary-result.component.scss']
})
export class DictionaryResultComponent implements OnInit {
  value: String;
  type: ParameterType;
  blockHistory: BlockHistory[];
  crossReference: CrossReference[];
  geolocationData: GeolocationData;
  constructor(
    private route: ActivatedRoute,
    private searchService: DictionarySearchService
  ) {}

  ngOnInit() {
    this.getSearchResult();
  }

  getSearchResult() {
    this.route.paramMap.subscribe(params => {
      this.value = params.get('value');
      this.type = ParameterType[params.get('type')];
      this.searchService.getMockSearch().subscribe(result => {
        this.blockHistory = result.blockHistory;
        this.crossReference = result.crossReference;
        this.geolocationData = result.geolocationData;
      });
    });
  }
}
