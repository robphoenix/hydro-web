import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'hydro-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss'],
})
export class RichEditorComponent implements OnInit, OnChanges {
  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  @Input()
  value: string;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();

  quill: any = Quill;
  editor: any;

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
    this.editor.on('editor-change', () =>
      this.changed.emit(this.editor.getContents()),
    );
    if (this.editor) {
      this.editor.setContents(this.value);
    }
  }

  ngOnChanges() {
    if (this.editor) {
      this.editor.setContents(this.value);
    }
  }
}
