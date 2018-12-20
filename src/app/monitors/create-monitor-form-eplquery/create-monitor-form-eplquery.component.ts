import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { EditorFromTextArea } from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/display/placeholder';
import sqlFormatter from 'sql-formatter';

declare var require: any;

@Component({
  selector: 'app-create-monitor-form-eplquery',
  templateUrl: './create-monitor-form-eplquery.component.html',
  styleUrls: ['./create-monitor-form-eplquery.component.scss'],
})
export class CreateMonitorFormEplqueryComponent implements AfterViewInit {
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
