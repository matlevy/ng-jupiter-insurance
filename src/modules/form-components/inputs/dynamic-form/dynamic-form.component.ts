import {
  Component, OnInit, Input, Output,
  EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl } from '@angular/forms';

import { FormQuestion } from '../../model/questions/form-question';
import { FormGeneratorService } from '../../service/form-generator.service';

import { LoggerService } from '../../../../modules/logging/logger.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  public _questions: FormQuestion<any>[] = [];

  @Output()
  public submit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public formReady: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public set questions(value: FormQuestion<any>[]) {
    this.logger.info(this, `Questions set with new value.`);
    this._questions = value;
    this.form = this.formGenerator.generateFormGroup(this._questions);
    this.formReady.emit(this.form);
  }
  public get questions(): FormQuestion<any>[] {
    return this._questions;
  }

  public form: FormGroup;

  constructor(
    private formGenerator: FormGeneratorService,
    private logger: LoggerService,
    private changeDetect: ChangeDetectorRef
  ) {  }

  private previousQuestionIsComplete(index: number): boolean {
    if (index === 0) {
      return true;
    }
    const prevQuestion: FormQuestion<any> = this.questions[index - 1];
    const prevControl: AbstractControl = this.form.controls[prevQuestion.key];
    return prevControl.valid;
  }

  private allPreviousQuestionsComplete(index: number): boolean {
    for (let i = 0; i <= index; i++) {
      if (!this.previousQuestionIsComplete(i)) {
        return false;
      }
    }
    return true;
  }

  ngOnInit() {}

  public onSubmit(): void {
    this.logger.info(this, `onSubmit called within form.`);
    this.submit.emit(this.form.value);
    this.changeDetect.detectChanges();
  }

}
