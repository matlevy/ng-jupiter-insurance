import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { Country } from '../../model/country';
import { CountryQuestion } from '../../model/questions/country-question';
import { Region } from '../../model/region';

import { CountriesService } from '../../service/api/countries.service';
import { RegionsService } from '../../service/api/regions.service';

import { LoggerService } from '../../../../modules/logging/logger.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['../../shared/shared.scss', '../shared/shared.scss', './country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

  /** Model object representing the {@link FormQuestion} the component is rendering */
  @Input()
  public question: CountryQuestion;

  /** FormGroup instance that will store the values of the component when the User edits the form */
  @Input()
  public group: FormGroup;

  /** The name of the control within the FormGroup that will contain values of the component */
  @Input()
  public controlName: string;

  private filteredCountries: Country[] = [];
  private selectedCountries = [];

  constructor(
    private countries: CountriesService,
    private regions: RegionsService,
    private activeRoute: ActivatedRoute,
    private logger: LoggerService
  ) { }

  /**
   * Select a Region value and sets the value of the Country on the form group controls list
   * @param region The Region instance to be selected
   */
  public selectRegion(region: Region): void {
    this.logger.log(this, `Selecting region '${region.name}'.`);
    this.group.controls[this.controlName].setValue({
      country: null,
      region: region
    });
    this.selectedCountries = [];
  }

  /**
   * Select a Country value and sets the value of the Country on the form group controls list
   * @param country Thr Country instance to select
   */
  public selectCountry(country: Country): void {
    this.logger.log(this, `Selecting country '${country.name}'.`);
    this.group.controls[this.controlName].setValue({
      country: country,
      region: country.region
    });
    this.selectedCountries = [country];
  }

  private clearCountryChoices(): void {
    this.logger.info(this, `Clearing country choices`);
    this.selectedCountries = [];
    this.group.controls[this.controlName].setValue(null);
  }

  /**
   * Utility function to test if a given country is the controls current selected Country
   * @param country The country to test against
   */
  private regionIsSelected(region: Region): boolean {
    const control: AbstractControl = this.group.controls[this.controlName];
    if (control.value === null) {
      return false;
    }
    return (control.value.region === region) && (control.value.country === null);
  }

  private filter(val: string): Country[] {
    return this.question.countries.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  private onFilterChange(v: any): void {
    this.filteredCountries = this.filter(v);
  }

  public refreshCountries(): void {
    this.logger.info(this, `Refreshing countries list in country select component.`);
    this.countries.list()
      .map(
        d => {
          const c: any = this.activeRoute.snapshot.queryParams[this.question.key + '.country'];
          this.question.countries = d;
          if (c) {
            this.logger.info(this, `Attempting to set selected country to '${c}'`);
            if (this.question.getCountryById(c)) {
              this.selectCountry(this.question.getCountryById(c));
            } else {
              this.logger.warn(`Could not find country '${c}'.`);
            }
          }
        }
      ).subscribe(
        d => d,
        e => this.group.setErrors(
          {
            loadErrors: e
          }
        )
      );
  }

  public refreshRegions(): void {
    this.regions.list(
      this.question.agentId,
      this.question.policyTypeId,
      this.question.campaignId
    )
    .map(
      d => {
        const r: any = this.activeRoute.snapshot.queryParams[this.question.key + '.region'];
        this.question.regions = d;
        if (r) {
          this.logger.info(this, `Attempting to set selected region to '${r}'`);
          if (this.question.getRegionById(r)) {
            this.selectRegion(this.question.getRegionById(r));
          } else {
            this.logger.warn('Could not find region.');
          }
        }
      }
    ).subscribe(
      d => d,
      e => this.group.setErrors(
        {
          loadErrors: e
        }
      )
    );
  }

  ngOnInit() {
    if (this.question.countries.length === 0) {
      this.refreshCountries();
    }
    if (this.question.regions.length === 0) {
      this.refreshRegions();
    }
    this.activeRoute.queryParams.subscribe(
      (v) => {
        if (v.country) {
          this.refreshCountries();
        } else if (v.region) {
          this.refreshRegions();
        }
      }
    );
  }

}
