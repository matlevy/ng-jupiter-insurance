import { Component, OnInit, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';

import { TravellerQuestion } from '../../model/questions/traveller-question';

import { Traveller, TravellerFactory } from '../../model/traveller';
import { FormGeneratorService } from '../../service';
import { QuestionFactory } from '../../model/questions/question-factory';
import { IListControl } from '../list-control.interface';
import { TravellersValidation } from './travellers-validaton';

import { LoggerService } from '../../../../modules/logging/logger.service';

/**
 * @whatItDoes Renders an input for the User to ba able to enter Travellers details, including:
 * forename, surname and age
 *
 * @howToUse
 *
 * To use, implement the selector within the section of the application providing a {@link TravellerQuestion},
 * {@link FormArray}, and {@link FormGroup} the FormArray is contained within. The TravellerQuestion must contain
 * a childControl property.
 */
@Component({
  selector: 'app-travellers-list',
  templateUrl: './travellers-list.component.html',
  styleUrls: ['./travellers-list.component.scss']
})
export class TravellersListComponent implements IListControl {

  @Input()
  public question: TravellerQuestion;

  @Input()
  public formArray: FormArray;

  @Input()
  public group: FormGroup;

  constructor(
    private travellerFactory: TravellerFactory,
    private questionFactory: QuestionFactory<any>,
    private formGenerator: FormGeneratorService,
    private logger: LoggerService
  ) { }

  /** Add a new sub form allowing the User to input a new Travellers deatils */
  public add(): void {
    this.logger.log(this, `Adding traveller to ${this.question.key}.`);
    const sub: FormGroup = this.createTravellerFormGroup();
    this.formArray.push(sub);
  }

  /** Transforms the FormQuestions of the childControl into FormGroup instances */
  private createTravellerFormGroup(): FormGroup {
    this.logger.info(this, `Creating traveller FormGroup`);
    return this.formGenerator.generateFormGroup(
      this.question.childControl.questions.map((d) => {
        return this.questionFactory.create(d);
      })
    );
  }

  /** Removes a Traveller from the list of Travellers at a specified index */
  public removeTraveller(index: number): void {
    this.logger.log(`Removing traveller.`);
    this.formArray.removeAt(index);
    this.logger.info(`Removed traveller.`);
  }

  public getTravellers(): any[] {
    return (<any>this.group.get('travellers')).controls;
  }
}
