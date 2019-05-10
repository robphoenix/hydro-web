import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { AuthService } from 'src/app/user/auth.service';
import { MonitorStatus } from '../monitor';

@Component({
  selector: 'hydro-view-toggle-status',
  templateUrl: './view-toggle-status.component.html',
  styleUrls: ['./view-toggle-status.component.scss'],
})
export class ViewToggleStatusComponent {
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
