import { Injectable } from '@angular/core';

export interface ITraveller {
    forname?: string;
    surname?: string;
    age?: number;
}

export class Traveller {
    public forname: string;
    public surname: string;
    public age: number;
    constructor( options?: ITraveller) {
        if (options) {
            this.forname = options.forname || '';
            this.surname = options.surname || '';
            this.age = options.age || 0;
        }
    }
}

@Injectable()
export class TravellerFactory {
    public create(options?: ITraveller): Traveller {
        return new Traveller(options);
    }
}
