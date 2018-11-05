import { Region } from './region';

export class Country {
    constructor(
        public id: number,
        public name: string,
        public region?: Region
    ) {}
}
