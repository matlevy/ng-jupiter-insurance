import { Component, Input, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormQuestion } from '../../model/questions/form-question';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
})
export class DynamicFormInputComponent implements OnInit {

  @Input()
  public question: FormQuestion<any>;

  @Input()
  public form: FormGroup;

  @ViewChild('childControl')
  public child: any;

  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor(
    private formBuilder: FormBuilder,
    private changeDetect: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.changeDetect.detectChanges();
  }

}
