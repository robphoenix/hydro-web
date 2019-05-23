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
    const style: CSSStyleDeclaration = this.el.nativeElement.style;
    style.margin = this.m || this.margin;
    style.marginTop = this.mt || this.mx;
    style.marginBottom = this.mb || this.mx;
    style.marginRight = this.mr || this.my;
    style.marginLeft = this.ml || this.my;
  }
}
