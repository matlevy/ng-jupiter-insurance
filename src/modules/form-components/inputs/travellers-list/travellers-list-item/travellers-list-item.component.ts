import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TravellerQuestion } from '../../../model/questions/traveller-question';
import { Traveller, TravellerFactory } from '../../../model/traveller';

@Component({
  selector: 'app-travellers-list-item',
  templateUrl: './travellers-list-item.component.html',
  styleUrls: ['./travellers-list-item.component.scss']
})
export class TravellersListItemComponent {

  @Input()
  public group: FormGroup;

  @Input()
  public question: TravellerQuestion;

  @Output()
  remove: EventEmitter<TravellerQuestion> = new EventEmitter<TravellerQuestion>();

  constructor() { }

  public removeItem(): void {
    this.remove.emit(this.question);
  }

}
