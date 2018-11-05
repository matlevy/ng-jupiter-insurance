import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  FormArray } from '@angular/forms';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { FormQuestion } from '../model/questions/form-question';

import {
  FormValidatorsService,
  FormGeneratorService
} from '../service';

import {
  ConsoleLogger,
  LogLevel
} from '../../logging';

import { LoggingModule } from '../../logging/logging.module';

describe('FormGeneratorService', () => {

  let questions: FormQuestion<any>[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormGeneratorService,
        FormBuilder,
        TranslateService,
        FormValidatorsService
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
    questions = [new FormQuestion({
      key: 'first', value: []
    }), new FormQuestion({
      key: 'second', value: []
    }), new FormQuestion({
      key: 'third', value: true
    }), new FormQuestion({
      key: 'fourth', value: true
    })];
  });

  it('should be created', inject([FormGeneratorService], (service: FormGeneratorService) => {
    expect(service).toBeTruthy();
  }));

  describe('generateFormControl', () => {
    it('should correctly set the default value of the FormControl', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      const control: FormControl = service.generateFormControl(questions[2]);
      expect(control.value).toBe(true);
    }));
    it('should correctly set the required validator for the FormControl', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      
    }));
  });

  describe('generateFormGroup', () => {
    it('should create a form group', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      expect(service.generateFormGroup(questions)).not.toBeNull();
      expect(service.generateFormGroup(questions).constructor.name).toBe('FormGroup');
    }));
    it('should create a FormControl if the questions value is not an array', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      const group: FormGroup = service.generateFormGroup(questions);
      const control: AbstractControl = group.controls['third'];
      expect(true).toBe(true);
      expect(control.constructor.name).toBe('FormControl');
    }));
    it('should create a FormArray if the questions value is an array', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      const group: FormGroup = service.generateFormGroup(questions);
      const control: AbstractControl = group.controls['first'];
      expect(true).toBe(true);
      expect(control.constructor.name).toBe('FormArray');
    }));
    it('should correctly set the default value of the FormControl', inject([
      FormGeneratorService
    ], (service: FormGeneratorService) => {
      const group: FormGroup = service.generateFormGroup(questions);
      const control: AbstractControl = group.controls['third'];
      expect(control.value).toBe(true);
    }));
  });
});
