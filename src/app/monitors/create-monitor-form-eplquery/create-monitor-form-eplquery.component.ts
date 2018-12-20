import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Editor, EditorFromTextArea } from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/display/placeholder';
declare var require: any;

@Component({
  selector: 'app-create-monitor-form-eplquery',
  templateUrl: './create-monitor-form-eplquery.component.html',
  styleUrls: ['./create-monitor-form-eplquery.component.scss'],
})
export class CreateMonitorFormEplqueryComponent
  implements OnInit, AfterViewInit {
  editor: EditorFromTextArea;
  @ViewChild('textarea')
  textarea: ElementRef;
  placeholder = 'Enter your EPL query here...';
  options = {
    mode: 'text/x-sql',
    lineWrapping: false,
    lineNumbers: true,
    theme: 'base16-light',
  };

  constructor() {}

  ngAfterViewInit() {
    const { fromTextArea } = require('codemirror');
    this.editor = fromTextArea(this.textarea.nativeElement, this.options);

    this.editor.on('change', (editor: Editor) => {
      const value = editor.getDoc().getValue();
      console.log({ value });
    });
  }

  ngOnInit() {}
}
