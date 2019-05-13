import { Component, Input, OnInit } from '@angular/core';
import { IMonitor } from '../monitor';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'hydro-view-monitors-list-item',
  templateUrl: './view-monitors-list-item.component.html',
  styleUrls: ['./view-monitors-list-item.component.scss'],
})
export class ViewMonitorsListItemComponent implements OnInit {
  public eplQueryButtonText = `View`;
  public allowsEnable: boolean;

  @Input()
  monitor: IMonitor;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.allowsEnable = this.authService.allowsEnable;
  }

  public viewMonitor() {
    this.router.navigateByUrl(`/monitors/${this.monitor.id}`);
  }

  public onMouseEnter() {
    this.eplQueryButtonText = `Copy`;
  }

  public onMouseLeave() {
    this.eplQueryButtonText = `View`;
  }

  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.monitor.query);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');

    this.snackBar.open(
      `${this.monitor.name} EPL Query copied to clipboard`,
      '',
      {
        duration: 2000,
      },
    );
  }
}
