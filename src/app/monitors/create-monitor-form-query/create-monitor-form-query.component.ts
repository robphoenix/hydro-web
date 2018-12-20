import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Editor, EditorFromTextArea } from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/display/placeholder';
import sqlFormatter from 'sql-formatter';

declare var require: any;

@Component({
  selector: 'app-create-monitor-form-query',
  templateUrl: './create-monitor-form-query.component.html',
  styleUrls: ['./create-monitor-form-query.component.scss'],
})
export class CreateMonitorFormQueryComponent implements AfterViewInit {
  @Input()
  validationMessages: { [key: string]: string };

  @Output()
  enterQuery = new EventEmitter<string>();

  @ViewChild('textarea')
  textarea: ElementRef;

  editor: EditorFromTextArea;
  placeholder = 'Enter your EPL query here...';
  options = {
    mode: 'text/x-sql',
    lineWrapping: false,
    lineNumbers: true,
    theme: 'base16-light',
  };

  ngAfterViewInit() {
    const { fromTextArea } = require('codemirror');
    this.editor = fromTextArea(this.textarea.nativeElement, this.options);

    this.editor.on('changes', (editor: Editor) => {
      const value = editor.getDoc().getValue();
      this.enterQuery.emit(value);
    });
  }

  format() {
    const value: string = this.editor.getDoc().getValue();
    this.editor.getDoc().setValue(sqlFormatter.format(value));
  }
}
