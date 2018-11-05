import { FormQuestion } from './form-question';
import { Country } from '../country';
import { IFormQuestionOptions } from './form-question-option.interface';
import { Region } from '../region';

export interface ICountryQuestionOptions extends IFormQuestionOptions<{ code: string, name: string }> {
    regions?: { id: number, name: string }[];
    countries?: { id: number, name: string }[];
    agentId?: number;
    policyTypeId?: number;
    campaignId?: number;
}

export class CountryQuestion extends FormQuestion<string> {
    public controlType = 'country';
    public type: string;
    public regions: Region[];
    public countries: Country[];
    public agentId: number;
    public policyTypeId: number;
    public campaignId: number;
    constructor(options: ICountryQuestionOptions) {
        super(<IFormQuestionOptions<any>>options);
        this.regions = options['regions'] || [];
        this.countries = options['countries'] || [];
        this.agentId = options.agentId || null;
        this.policyTypeId = options.policyTypeId || null;
        this.campaignId = options.campaignId || null;
    }
    public getCountryById(id: number): Country {
        if (this.countries) {
            return this.countries.find(v => v.id == id);
        }
        return null;
    }
    public getRegionById(id: number): Region {
        if (this.regions) {
            return this.regions.find(v => v.id == id);
        }
        return null;
    }
}
