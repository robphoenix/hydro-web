import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  IActionMetadataEmpty,
} from '../action';
import { ValidateBet365Email } from 'src/validators/bet365-email.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'hydro-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss'],
})
export class CreateActionComponent implements OnInit {
  public createActionForm: FormGroup;
  public blockForm: FormGroup;
  public emailRateForm: FormGroup;
  public emailBatchForm: FormGroup;
  public emailAlertForm: FormGroup;
  private _action: IAction;

  @Input()
  public set action(action: IAction) {
    this._action = action;
    if (action) {
      const { name, description, actionType, metadata } = this.action;
      this.createActionForm.patchValue({
        name,
        description,
        actionType,
      });
      switch (actionType) {
        case ActionType.Block:
          this.patchBlockForm(metadata as IActionMetadataBlock);
          break;
        case ActionType.EmailRate:
          this.patchEmailRateForm(metadata as IActionMetadataEmailRate);
          break;
        case ActionType.EmailBatch:
          this.patchEmailBatchForm(metadata as IActionMetadataEmailBatch);
          break;
        case ActionType.EmailAlert:
          this.patchEmailAlertForm(metadata as IActionMetadataEmailAlert);
          break;
      }
    }
  }

  public get action(): IAction {
    return this._action;
  }

  @Output()
  submitForm = new EventEmitter<IAction>();

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createActionForm = this.formBuilder.group({
      name: [``, Validators.required],
      description: [``, Validators.required],
      actionType: [ActionType.Block, Validators.required],
    });
    this.blockForm = this.formBuilder.group({
      parameters: [[], Validators.required],
      permanently: [false],
      blockTime: [``, Validators.required],
      blockTimeUnit: [``, Validators.required],
      blockDelay: [``],
      blockDelayUnit: [``],
    });
    this.emailRateForm = this.formBuilder.group({
      emailAddresses: this.formBuilder.array([
        this.formBuilder.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailSendLimit: [0],
      emailText: [``, Validators.required],
    });
    this.emailBatchForm = this.formBuilder.group({
      emailAddresses: this.formBuilder.array([
        this.formBuilder.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailCron: [``, Validators.required],
      emailText: [``, Validators.required],
    });
    this.emailAlertForm = this.formBuilder.group({
      emailAddresses: this.formBuilder.array([
        this.formBuilder.group({ emailAddress: [``, ValidateBet365Email] }),
      ]),
      emailSubject: [``, Validators.required],
      emailText: [``, Validators.required],
      parameters: [[], Validators.required],
    });
  }

  ngOnInit() {
    const blockTimeCtrl: AbstractControl = this.blockForm.get(`blockTime`);
    const blockTimeUnitCtrl: AbstractControl = this.blockForm.get(
      `blockTimeUnit`,
    );
    const blockDelayCtrl: AbstractControl = this.blockForm.get(`blockDelay`);
    const blockDelayUnitCtrl: AbstractControl = this.blockForm.get(
      `blockDelayUnit`,
    );

    // We want to remove any validation from the time unit inputs if the user is blocking permanently
    this.blockForm
      .get('permanently')
      .valueChanges.subscribe((blockPermanently: boolean) => {
        if (blockPermanently) {
          this.clearValidators([blockTimeCtrl, blockTimeUnitCtrl]);
          blockTimeCtrl.setValue(``);
          blockTimeUnitCtrl.setValue(``);
          blockTimeCtrl.disable();
          blockDelayCtrl.disable();
        } else {
          blockTimeCtrl.setValidators(Validators.required);
          blockTimeCtrl.updateValueAndValidity();
          blockTimeUnitCtrl.setValidators(Validators.required);
          blockTimeUnitCtrl.updateValueAndValidity();
          blockTimeCtrl.enable();
          blockDelayCtrl.enable();
          blockTimeCtrl.markAsUntouched();
          blockTimeUnitCtrl.markAsUntouched();
        }
      });

    // We don't want to submit a block action that has a delay time but no delay unit
    this.blockForm
      .get(`blockDelay`)
      .valueChanges.subscribe((blockDelayValue: string) => {
        if (blockDelayValue !== ``) {
          blockDelayUnitCtrl.setValidators(Validators.required);
          blockDelayUnitCtrl.setErrors({ required: true });
        } else {
          blockDelayUnitCtrl.clearValidators();
        }
      });
  }

  private patchBlockForm(metadata: IActionMetadataBlock): void {
    const {
      parameters,
      blockTime,
      blockTimeUnit,
      blockDelay,
      blockDelayUnit,
    } = metadata;

    if (blockTime < 0) {
      this.blockForm.patchValue({
        parameters,
        permanently: true,
      });
    } else {
      this.blockForm.patchValue({
        parameters,
        permanently: false,
        blockTime,
        blockTimeUnit,
        blockDelay,
        blockDelayUnit,
      });
    }
  }

  private patchEmailRateForm(metadata: IActionMetadataEmailRate): void {
    // empty the initial form array
    (this.emailRateForm.get(`emailAddresses`) as FormArray).removeAt(0);
    // and push any existing email addresses onto it
    metadata.emailAddresses.split(`;`).map((emailAddress: string) => {
      this.addEmailAddress(this.emailRateForm, emailAddress.trim());
    });

    const { emailSubject, emailSendLimit, emailText } = metadata;
    this.emailRateForm.patchValue({
      emailSubject,
      emailSendLimit,
      emailText,
    });
  }

  private patchEmailBatchForm(metadata: IActionMetadataEmailBatch): void {
    // empty the initial form array
    (this.emailBatchForm.get(`emailAddresses`) as FormArray).removeAt(0);
    // and push any existing email addresses onto it
    metadata.emailAddresses.split(`;`).map((emailAddress: string) => {
      this.addEmailAddress(this.emailRateForm, emailAddress.trim());
    });

    const { emailSubject, emailCron, emailText } = metadata;
    this.emailBatchForm.patchValue({
      emailSubject,
      emailCron,
      emailText,
    });
  }

  private patchEmailAlertForm(metadata: IActionMetadataEmailAlert): void {
    // empty the initial form array
    (this.emailAlertForm.get(`emailAddresses`) as FormArray).removeAt(0);
    // and push any existing email addresses onto it
    metadata.emailAddresses.split(`;`).map((emailAddress: string) => {
      this.addEmailAddress(this.emailRateForm, emailAddress.trim());
    });

    const { emailSubject, parameters, emailText } = metadata;
    this.emailAlertForm.patchValue({
      emailSubject,
      parameters,
      emailText,
    });
  }

  public isActionType(actionType: string): boolean {
    return actionType === this.createActionForm.get(`actionType`).value;
  }

  public emailEditorContentChange(editorData: {
    form: FormGroup;
    emailText: string;
  }) {
    const { form, emailText } = editorData;
    form.patchValue({ emailText });
  }

  public get disableSubmit() {
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
      case ActionType.EmailBatch:
        return !(validBaseForm && this.emailBatchForm.valid);
      case ActionType.EmailAlert:
        return !(validBaseForm && this.emailAlertForm.valid);
      default:
        return !validBaseForm;
    }
  }

  public clearValidators(controls: AbstractControl[]) {
    controls.map((ctrl: AbstractControl) => {
      ctrl.clearValidators();
      ctrl.updateValueAndValidity();
    });
  }

  public addEmailAddress(form: FormGroup, emailAddress?: string) {
    (form.get(`emailAddresses`) as FormArray).push(
      this.formBuilder.group({
        emailAddress: [emailAddress || ``, ValidateBet365Email],
      }),
    );
  }

  public removeEmailAddress(index: number, form: FormGroup) {
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

  private get emailBatchMetadata(): IActionMetadataEmailBatch {
    const emailForm = this.emailBatchForm.getRawValue();
    const { emailSubject, emailCron, emailText } = emailForm;
    const emailAddresses = this.emailAddresses(this.emailBatchForm);

    return {
      emailAddresses,
      emailSubject,
      emailCron,
      emailText,
    } as IActionMetadataEmailBatch;
  }

  private get emailAlertMetadata(): IActionMetadataEmailAlert {
    const emailForm = this.emailAlertForm.getRawValue();
    const { emailSubject, parameters, emailText } = emailForm;
    const emailAddresses = this.emailAddresses(this.emailAlertForm);

    return {
      emailAddresses,
      emailSubject,
      parameters,
      emailText,
    } as IActionMetadataEmailAlert;
  }

  public onSubmit() {
    const {
      actionType,
      name,
      description,
    } = this.createActionForm.getRawValue();

    let metadata:
      | IActionMetadataBlock
      | IActionMetadataEmailRate
      | IActionMetadataEmailBatch
      | IActionMetadataEmailAlert
      | IActionMetadataEmpty;

    switch (actionType) {
      case ActionType.Block:
        metadata = this.blockMetadata;
        break;
      case ActionType.EmailRate:
        metadata = this.emailRateMetadata;
        break;
      case ActionType.EmailBatch:
        metadata = this.emailBatchMetadata;
        break;
      case ActionType.EmailAlert:
        metadata = this.emailAlertMetadata;
        break;
      default:
        metadata = {} as IActionMetadataEmpty;
    }

    const data = {
      name,
      actionType,
      description,
      metadata,
    } as IAction;

    if (this.action) {
      data.id = this.action.id;
    }

    this.submitForm.emit(data);
  }

  reset() {
    [
      this.createActionForm,
      this.blockForm,
      this.emailRateForm,
      this.emailAlertForm,
      this.emailBatchForm,
    ].map((form: FormGroup) => form.reset());
  }

  cancel() {
    this.router.navigateByUrl('/actions/view');
  }
}
