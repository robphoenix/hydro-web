import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  IActionMetadataBlock,
  IActionMetadataEmail,
  IAction,
  ActionGroup,
} from '../action';
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
      parameters: [[``], Validators.required],
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
    const parametersValue: string[] = form.get(`parameters`).value;
    const parameters = parametersValue
      ? parametersValue.map((param: string) => param.trim()).join(`, `)
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

    const name = `Block ${parameters} ${permanently ? `permanently` : time}`;

    return name.trim();
  }

  submit() {
    const { group, name, description } = this.createActionForm.getRawValue();
    let metadata: IActionMetadataBlock | IActionMetadataEmail;
    switch (group) {
      case ActionGroup.Block:
        const {
          permanently,
          blockTime,
          blockTimeUnit,
          blockDelay,
          blockDelayUnit,
          parameters,
        } = this.blockDataForm.getRawValue();
        if (permanently) {
          metadata = {
            blockTime: -1,
            parameters,
          } as IActionMetadataBlock;
        } else {
          metadata = {
            blockTime,
            blockTimeUnit,
            blockDelay,
            blockDelayUnit,
            parameters,
          } as IActionMetadataBlock;
        }
    }

    const data = {
      name,
      group,
      description,
      metadata,
    } as IAction;

    console.log({ data });

    this.actionsService.addAction(data).subscribe(
      (res: IAction) => {
        this.createActionForm.reset();
        this.router.navigateByUrl(`/actions`);
        this.snackBar.open(`Action ${name} created`, '', {
          duration: 2000,
        });
      },
      (err) => {
        console.log({ err });

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
