import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellersListItemComponent } from './travellers-list-item.component';

xdescribe('TravellersListItemComponent', () => {
  let component: TravellersListItemComponent;
  let fixture: ComponentFixture<TravellersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellersListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
