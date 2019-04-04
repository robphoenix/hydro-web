import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActionGroup } from 'src/app/monitors/monitor';
import {
  IActionsMetadataBlock,
  IActionsMetadataEmail,
  ActionsBlockType,
  IActions,
} from '../actions';
import { ActionsService } from '../actions.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

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
    blockTime: {
      required: `You must specify a block time or block permanently`,
    },
  };

  blockActionUnits: { [key: string]: string[] } = {
    duration: [`minutes`, `hours`, `days`],
    delay: [`seconds`, `minutes`, `hours`],
  };

  @Input()
  title: string;

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionsService,
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.blockDataForm = this.fb.group({
      blockParameters: [[``], Validators.required],
      permanently: [false],
      blockTime: [``, Validators.required],
      blockTimeUnit: [``, Validators.required],
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

    const blockTime: AbstractControl = this.blockDataForm.get(`blockTime`);
    const blockTimeUnit: AbstractControl = this.blockDataForm.get(
      `blockTimeUnit`,
    );
    const blockDelay: AbstractControl = this.blockDataForm.get(`blockDelay`);
    const blockDelayUnit: AbstractControl = this.blockDataForm.get(
      `blockDelayUnit`,
    );

    // We want to remove any validation from the time unit inputs if the user is blocking permanently
    this.blockDataForm
      .get('permanently')
      .valueChanges.subscribe((blockPermanentlyValue: boolean) => {
        if (blockPermanentlyValue) {
          blockTime.clearValidators();
          blockTimeUnit.clearValidators();
          blockTime.setValue(``);
          blockTimeUnit.setValue(``);
          blockTime.disable();
          blockDelay.disable();
        } else {
          blockTime.setValidators(Validators.required);
          blockTimeUnit.setValidators(Validators.required);
          blockTime.enable();
          blockDelay.enable();
          blockTime.markAsUntouched();
          blockTimeUnit.markAsUntouched();
        }
      });

    // We don't want to submit a block action that has a delay time but no delay unit
    this.blockDataForm
      .get(`blockDelay`)
      .valueChanges.subscribe((blockDelayValue: string) => {
        if (blockDelayValue !== ``) {
          blockDelayUnit.setValidators(Validators.required);
          blockDelayUnit.setErrors({ required: true });
        } else {
          blockDelayUnit.clearValidators();
        }
      });
  }

  blockName(): string {
    const form = this.blockDataForm;
    const permanently: boolean = form.get(`permanently`).value;
    const blockParametersValue: string[] = form.get(`blockParameters`).value;
    const blockParameters = blockParametersValue
      ? blockParametersValue.map((param: string) => param.trim()).join(`, `)
      : ``;
    const blockTime: string = form.get(`blockTime`).value.trim();
    const blockTimeUnit: string = form.get(`blockTimeUnit`).value.trim();
    const blockDelay: string = form.get(`blockDelay`).value.trim();
    const blockDelayUnit: string = form.get(`blockDelayUnit`).value.trim();

    const duration: string =
      !permanently && blockTime && blockTimeUnit
        ? `for ${blockTime} ${blockTimeUnit}`
        : ``;

    const delay: string =
      !permanently && blockDelay && blockDelayUnit
        ? `with up to ${blockDelay} ${blockDelayUnit} random delay`
        : ``;

    const time = `${duration} ${delay}`;

    const name = `Block ${blockParameters} ${
      permanently ? `permanently` : time
    }`;

    return name.trim();
  }

  submit() {
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
    }

    const data = {
      name,
      group,
      description,
      metadata,
    } as IActions;

    console.log({ data });

    this.actionsService.addAction(data).subscribe(
      (res: IActions) => {
        this.createActionForm.reset();
        this.router.navigateByUrl(`/actions`);
        this.snackBar.open(`Action ${name} created`, '', {
          duration: 2000,
        });
      },
      (err: IErrorMessage) => {
        const title = `error adding action`;
        const { message, cause } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });
      },
    );
  }
}
