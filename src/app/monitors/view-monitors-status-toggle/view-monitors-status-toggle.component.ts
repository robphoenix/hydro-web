import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonitorStatus } from '../monitor';
import { AuthService } from 'src/app/user/auth.service';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'hydro-view-monitors-status-toggle',
  templateUrl: './view-monitors-status-toggle.component.html',
  styleUrls: ['./view-monitors-status-toggle.component.scss'],
})
export class ViewMonitorsStatusToggleComponent {
  @Input()
  status: string;

  @Output()
  toggleStatus = new EventEmitter<MonitorStatus>();

  constructor(private authService: AuthService) {}

  public get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  public onToggleStatus(event: MatButtonToggleChange) {
    const status: MonitorStatus = event.value;
    this.toggleStatus.emit(status);
  }
}
