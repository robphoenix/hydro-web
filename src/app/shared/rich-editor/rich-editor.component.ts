import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnDestroy,
  Injector,
  DoCheck,
  HostBinding,
} from '@angular/core';
import Quill from 'quill';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { Quill as QuillInstance } from 'quill';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'hydro-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichEditorComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: RichEditorComponent,
    },
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  },
})
export class RichEditorComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    DoCheck,
    ControlValueAccessor,
    MatFormFieldControl<any> {
  // tslint:disable-next-line:max-line-length
  // This component is from https://itnext.io/creating-a-custom-form-field-control-compatible-with-reactive-forms-and-angular-material-cf195905b451
  static nextId = 0;

  public touched: boolean;
  public ngControl: NgControl;
  public stateChanges = new Subject<void>();
  public controlType = `richeditor`;
  public errorState = false;
  public focused = false;

  private _placeholder: string;
  private _value: any;
  private _required = false;
  private _disabled = false;

  @HostBinding()
  id = `rich-editor-input-${RichEditorComponent.nextId++}`;

  @HostBinding(`class.floating`)
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding(`attr.aria-describedby`)
  describedBy = ``;

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(` `);
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  // quill: QuillInstance;
  editor: QuillInstance;

  constructor(
    public elementRef: ElementRef,
    public injector: Injector,
    public focusMonitor: FocusMonitor,
  ) {
    this.focusMonitor
      .monitor(this.elementRef.nativeElement, true)
      .subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    const editor = this.container.nativeElement.querySelector('#editor');
    this.editor = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ size: ['small', false, 'large'] }],
          ['bold', 'italic', 'underline'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ indent: '-1' }, { indent: '+1' }],

          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [{ list: 'bullet' }, { list: 'ordered' }],
          ['link', 'image'],
        ],
      },
      placeholder: 'Please enter your email template here. *Required.',
    });
    this.editor.on('editor-change', () => {
      this.onChange(this.editor.root.innerHTML);
    });
  }

  onChange = (delta: any) => {};

  onTouched = () => {
    this.touched = true;
  };

  writeValue(delta: any): void {
    this.editor.setContents(delta);
    this._value = delta;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnChanges() {
    if (this.editor) {
      this.editor.setContents(this._value);
    }
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.stateChanges.complete();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  get value(): any {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.editor.setContents(this._value);
    this.onChange(value);
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    console.log({ req });

    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  get empty() {
    const commentText = this.editor.getText().trim();
    // console.log({ commentText });

    return commentText ? false : true;
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'div') {
      this.container.nativeElement.querySelector('div').focus();
    }
  }
}
