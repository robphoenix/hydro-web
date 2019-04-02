import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionGroup } from 'src/app/monitors/monitor';
import {
  IActionsMetadataBlock,
  IActionsMetadataEmail,
  ActionsBlockType,
  IActions,
} from '../actions';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  createActionForm: FormGroup;
  blockDataForm: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } } = {
    description: {
      required: `You must enter an action description`,
    },
    blockParameter: {
      required: `You must choose parameters to block on`,
    },
  };

  blockActionUnits: { [key: string]: string[] } = {
    duration: [`minutes`, `hours`, `days`],
    delay: [`seconds`, `minutes`, `hours`],
  };

  @Input()
  title: string;

  constructor(private fb: FormBuilder, private actionsService: ActionsService) {
    this.blockDataForm = this.fb.group({
      blockParameters: [[``], Validators.required],
      permanently: [false],

      blockTime: [``],
      blockTimeUnit: [``],
      blockDelay: [``],
      blockDelayUnit: [``],
    });
    this.createActionForm = this.fb.group({
      name: ``,
      description: [``, Validators.required],
      group: [ActionGroup.Block, Validators.required],
      blockData: this.blockDataForm,
    });
  }

  ngOnInit() {
    this.blockDataForm.valueChanges.subscribe(() => {
      const name = this.blockName();
      this.createActionForm.patchValue({ name });
    });
  }

  blockName(): string {
    const form = this.blockDataForm;
    const permanently = form.get(`permanently`).value;
    const blockParameters = form
      .get(`blockParameters`)
      .value.map((param: string) => param.trim())
      .join(`, `);
    const blockTime = form.get(`blockTime`).value.trim();
    const blockTimeUnit = form.get(`blockTimeUnit`).value.trim();
    const blockDelay = form.get(`blockDelay`).value.trim();
    const blockDelayUnit = form.get(`blockDelayUnit`).value.trim();

    const duration =
      !permanently && blockTime && blockTimeUnit
        ? `for ${blockTime} ${blockTimeUnit}`
        : ``;

    const delay =
      !permanently && blockDelay && blockDelayUnit
        ? `with up to ${blockDelay} ${blockDelayUnit} random delay`
        : ``;

    const time = `${duration} ${delay}`;

    const name = `Block ${blockParameters} ${
      permanently ? `permanently` : time
    }`;

    return name.trim();
  }

  onSubmit() {
    const { group, name, description } = this.createActionForm.getRawValue();
    let metadata: IActionsMetadataBlock | IActionsMetadataEmail;
    switch (group) {
      case ActionGroup.Block:
        const {
          permanently,
          blockTime,
          blockTimeUnit,
          blockDelay,
          blockDelayUnit,
          blockParameters,
        } = this.blockDataForm.getRawValue();
        if (permanently) {
          metadata = {
            type: ActionsBlockType.SimpleBlock,
            blockTime: -1,
            blockParameters,
          } as IActionsMetadataBlock;
        } else {
          metadata = {
            type: ActionsBlockType.SimpleBlock,
            blockTime,
            blockTimeUnit,
            blockDelay,
            blockDelayUnit,
            blockParameters,
          };
        }
        break;

      default:
        break;
    }

    const data = {
      name,
      group,
      description,
      metadata,
    } as IActions;

    console.log({ data });

    this.actionsService.addAction(data).subscribe(
      (res) => {
        console.log({ res });
      },
      (err) => {
        console.error({ err });
      },
    );
  }
}
