import { JavaType } from './../feedtypes';
import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { TitleService } from 'src/app/shared/title.service';
import { Title } from '@angular/platform-browser';
import { IFeedTypes } from '../feedtypes';
import { IErrorMessage } from 'src/app/shared/error-message';

@Component({
  selector: 'hydro-view-feedtypes',
  templateUrl: './view-feedtypes.component.html',
  styleUrls: ['./view-feedtypes.component.scss'],
})
export class ViewFeedtypesComponent implements OnInit {
  public feedTypes: IFeedTypes;
  public esperDataTypes: string[];
  public currentDataType: string;
  public fields: { [key: string]: JavaType };
  public fieldKeys: string[];

  constructor(
    private monitorsService: MonitorsService,
    titleService: TitleService,
    title: Title,
  ) {
    title.setTitle(titleService.title(`View Feed Types`));
  }

  ngOnInit() {
    this.getFeedTypes();
  }

  private getFeedTypes() {
    this.monitorsService.getFeedTypes().subscribe(
      (feedTypes: IFeedTypes) => {
        this.feedTypes = feedTypes;
        this.esperDataTypes = Object.keys(feedTypes).sort();
        this.currentDataType = this.esperDataTypes[0];
        this.fields = feedTypes[this.currentDataType];
        this.fieldKeys = Object.keys(this.fields);
      },
      (error: IErrorMessage) => console.log({ error }),
    );
  }

  public showFields(esperDataType: string) {
    this.currentDataType = esperDataType;
    this.fields = this.feedTypes[esperDataType];
    this.fieldKeys = Object.keys(this.fields);
  }
}
