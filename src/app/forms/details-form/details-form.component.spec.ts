import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFormComponent } from './details-form.component';
import { TravelQuotationService } from '../../service';
import { Observable } from 'rxjs/Observable';

export class MockTravelQuotationService {
  loadFormQuestions(): Observable<any[]> {
    return Observable.of([{}, {}, {}]);
  }
}

xdescribe('DetailsFormComponent', () => {
  let component: DetailsFormComponent;
  let fixture: ComponentFixture<DetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsFormComponent,
        { provider: TravelQuotationService, useClass: MockTravelQuotationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise correctly', () => {
    expect(component.questions).toBeNull();
  });

  it('should correctly load the questions and set them to the questions property of the component', () => {
    component.ngOnInit();
    expect(component.questions.length).toBe(3);
  });
});
