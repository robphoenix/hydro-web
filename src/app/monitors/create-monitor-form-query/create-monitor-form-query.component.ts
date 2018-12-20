import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { EditorFromTextArea } from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/display/placeholder';
import sqlFormatter from 'sql-formatter';
import { FormGroup } from '@angular/forms';

declare var require: any;

@Component({
  selector: 'app-create-monitor-form-query',
  templateUrl: './create-monitor-form-query.component.html',
  styleUrls: ['./create-monitor-form-query.component.scss'],
})
export class CreateMonitorFormQueryComponent implements AfterViewInit {
  @Input()
  parent: FormGroup;

  @Input()
  validationMessages: { [key: string]: string };

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

    // I'm just going to leave this here for future me.
    // this.editor.on('change', (editor: Editor) => {
    //   const value = editor.getDoc().getValue();
    //   console.log({ value });
    // });
  }

  format() {
    const value: string = this.editor.getDoc().getValue();
    this.editor.getDoc().setValue(sqlFormatter.format(value));
  }
}
