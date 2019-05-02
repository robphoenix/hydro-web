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
} from '@angular/core';
import Quill from 'quill';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Quill as QuillInstance } from 'quill';

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
  ],
})
export class RichEditorComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  touched: boolean;

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  @Input()
  value: any;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  // quill: QuillInstance;
  editor: QuillInstance;

  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {
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
  }

  writeValue(delta: any): void {
    this.editor.setContents(delta);
    this.value = delta;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnChanges() {
    if (this.editor) {
      this.editor.setContents(this.value);
    }
  }
}
