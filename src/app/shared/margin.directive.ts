import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[margin], [m], [mt], [mr], [mb], [ml], [mx], [my]',
})
export class MarginDirective implements OnInit {
  @Input()
  margin: string;

  @Input()
  m: string;

  @Input()
  mt: string;

  @Input()
  mr: string;

  @Input()
  mb: string;

  @Input()
  ml: string;

  @Input()
  mx: string;

  @Input()
  my: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const elementStyle = this.el.nativeElement.style;
    elementStyle.margin = this.m || this.margin;
    elementStyle.marginTop = this.mt || this.mx;
    elementStyle.marginBottom = this.mb || this.mx;
    elementStyle.marginRight = this.mr || this.my;
    elementStyle.marginLeft = this.ml || this.my;
  }
}
