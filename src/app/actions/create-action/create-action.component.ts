import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import {
  IActionMetadataBlock,
  IAction,
  ActionType,
  IActionMetadataEmailRate,
  IActionMetadataEmailBatch,
  IActionMetadataEmailAlert,
} from '../action';
import { ActionsService } from '../actions.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { ValidateBet365Email } from 'src/validators/bet365-email.validator';

@Component({
  selector: 'hydro-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss'],
})
export class CreateActionComponent implements OnInit {
  public createActionForm: FormGroup;
  public blockForm: FormGroup;
  public emailDataForm: FormGroup;
  public emailRateForm: FormGroup;
  public emailBatchForm: FormGroup;

  public validationMessages: { [key: string]: { [key: string]: string } } = {
    emailCron: {
      required: `You must specify an email cron expression`,
    },
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
    this.blockForm = this.fb.group({
      parameters: [[], Validators.required],
      permanently: [false],
      blockTime: [``, Validators.required],
      blockTimeUnit: [``, Validators.required],
      blockDelay: [``],
      blockDelayUnit: [``],
    });
    this.emailDataForm = this.fb.group({
      parameters: [[], Validators.required],
      emailAddresses: this.fb.array([
        this.fb.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailSendLimit: [0, Validators.required],
      emailText: [``, Validators.required],
      emailCron: [``, Validators.required],
    });
    this.emailRateForm = this.fb.group({
      emailAddresses: this.fb.array([
        this.fb.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailSendLimit: [0],
      emailText: [``, Validators.required],
    });
    this.emailBatchForm = this.fb.group({
      emailAddresses: this.fb.array([
        this.fb.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailCron: [``, Validators.required],
      emailText: [``, Validators.required],
    });

    this.createActionForm = this.fb.group({
      name: [``, Validators.required],
      description: [``, Validators.required],
      actionType: [ActionType.Block, Validators.required],
    });
  }

  ngOnInit() {
    const blockTime: AbstractControl = this.blockForm.get(`blockTime`);
    const blockTimeUnit: AbstractControl = this.blockForm.get(`blockTimeUnit`);
    const blockDelay: AbstractControl = this.blockForm.get(`blockDelay`);
    const blockDelayUnit: AbstractControl = this.blockForm.get(
      `blockDelayUnit`,
    );

    // We want to remove any validation from the time unit inputs if the user is blocking permanently
    this.blockForm
      .get('permanently')
      .valueChanges.subscribe((blockPermanently: boolean) => {
        if (blockPermanently) {
          this.clearValidators([blockTime, blockTimeUnit]);
          blockTime.setValue(``);
          blockTimeUnit.setValue(``);
          blockTime.disable();
          blockDelay.disable();
        } else {
          blockTime.setValidators(Validators.required);
          blockTime.updateValueAndValidity();
          blockTimeUnit.setValidators(Validators.required);
          blockTimeUnit.updateValueAndValidity();
          blockTime.enable();
          blockDelay.enable();
          blockTime.markAsUntouched();
          blockTimeUnit.markAsUntouched();
        }
      });

    // We don't want to submit a block action that has a delay time but no delay unit
    this.blockForm
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

  public isActionType(actionType: string): boolean {
    return actionType === this.createActionForm.get(`actionType`).value;
  }

  emailEditorContentChange(editorData: { form: FormGroup; emailText: string }) {
    const { form, emailText } = editorData;
    form.patchValue({ emailText });
  }

  get disableSubmit() {
    const {
      valid: actionTypeValid,
      value: actionType,
    } = this.createActionForm.get(`actionType`);

    const validBaseForm: boolean =
      this.createActionForm.get(`name`).valid &&
      this.createActionForm.get(`description`).valid &&
      actionTypeValid;

    switch (actionType) {
      case ActionType.Block:
        return !(validBaseForm && this.blockForm.valid);
      case ActionType.EmailRate:
        return !(validBaseForm && this.emailRateForm.valid);
    }
  }

  clearValidators(controls: AbstractControl[]) {
    controls.map((ctrl: AbstractControl) => {
      ctrl.clearValidators();
      ctrl.updateValueAndValidity();
    });
  }

  addEmailAddress(form: FormGroup) {
    (form.get(`emailAddresses`) as FormArray).push(
      this.fb.group({ emailAddress: [``, ValidateBet365Email] }),
    );
  }

  removeEmailAddress(index: number, form: FormGroup) {
    (form.get(`emailAddresses`) as FormArray).removeAt(index);
  }

  private get blockMetadata(): IActionMetadataBlock {
    const {
      permanently,
      blockTime,
      blockTimeUnit,
      blockDelay,
      blockDelayUnit,
      parameters,
    } = this.blockForm.getRawValue();

    const metadata = permanently
      ? {
          blockTime: -1,
          parameters,
        }
      : {
          blockTime,
          blockTimeUnit,
          blockDelay,
          blockDelayUnit,
          parameters,
        };

    return metadata as IActionMetadataBlock;
  }

  private emailAddresses(form: FormGroup): string {
    return form
      .getRawValue()
      .emailAddresses.map((address: { emailAddress: string }) => {
        return address.emailAddress;
      })
      .join(`;`);
  }

  private get emailRateMetadata(): IActionMetadataEmailRate {
    const {
      emailSubject,
      emailSendLimit,
      emailText,
    } = this.emailRateForm.getRawValue();
    const emailAddresses = this.emailAddresses(this.emailRateForm);

    return {
      emailAddresses,
      emailSubject,
      emailSendLimit,
      emailText,
    } as IActionMetadataEmailRate;
  }

  // private get emailBatchMetadata(): IActionMetadataEmailBatch {
  //   const emailForm = this.emailDataForm.getRawValue();
  //   const { emailSubject, emailCron, emailText } = emailForm;
  //   const emailAddresses = this.emailAddresses();

  //   return {
  //     emailAddresses,
  //     emailSubject,
  //     emailCron,
  //     emailText,
  //   } as IActionMetadataEmailBatch;
  // }

  // private get emailAlertMetadata(): IActionMetadataEmailAlert {
  //   const emailForm = this.emailDataForm.getRawValue();
  //   const { emailSubject, parameters, emailText } = emailForm;
  //   const emailAddresses = this.emailAddresses();

  //   return {
  //     emailAddresses,
  //     emailSubject,
  //     parameters,
  //     emailText,
  //   } as IActionMetadataEmailAlert;
  // }

  submit() {
    const {
      actionType,
      name,
      description,
    } = this.createActionForm.getRawValue();

    let metadata:
      | IActionMetadataBlock
      | IActionMetadataEmailRate
      | IActionMetadataEmailBatch
      | IActionMetadataEmailAlert;

    switch (actionType) {
      case ActionType.Block:
        metadata = this.blockMetadata;
        break;
      case ActionType.EmailRate:
        metadata = this.emailRateMetadata;
        break;
      // case ActionType.EmailBatch:
      //   metadata = this.emailBatchMetadata;
      //   break;
      // case ActionType.EmailAlert:
      //   metadata = this.emailAlertMetadata;
      //   break;
    }

    const data = {
      name,
      actionType,
      description,
      metadata,
    } as IAction;

    console.log({ data });

    this.actionsService.addAction(data).subscribe(
      (res: IAction) => {
        console.log({ res });

        this.createActionForm.reset();
        this.router.navigateByUrl(`/actions/view`);
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
