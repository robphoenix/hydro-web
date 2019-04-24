import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-logotype-link',
  templateUrl: './logotype-link.component.html',
  styleUrls: ['./logotype-link.component.scss'],
})
export class LogotypeLinkComponent {
  @Input()
  color: String;
}
