import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFramesetComponent } from './app-frameset.component';

xdescribe('AppFramesetComponent', () => {
  let component: AppFramesetComponent;
  let fixture: ComponentFixture<AppFramesetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFramesetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFramesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
