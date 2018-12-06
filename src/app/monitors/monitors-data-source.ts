import { DataSource } from '@angular/cdk/table';
import { MonitorsService } from './monitors.service';
import { Observable } from 'rxjs';
import { IMonitor } from './monitor';

export class MonitorsDataSource extends DataSource<any> {
  constructor(private monitorsService: MonitorsService) {
    super();
  }

  connect(): Observable<IMonitor[]> {
    return this.monitorsService.getMonitors();
  }

  disconnect() {}
}
