import { Injectable } from '@angular/core';

import { LoggerService } from '../../logging/logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormConfigLoaderService {

    public regionsEndpoint: string;
    public countriesEndpoint: string;
    public loggingEndpoint: string;
    public agentId: number;
    public local = true;

    public config: Subject<any> = new Subject();

    constructor(
        private http: HttpClient,
        private configPath: string
    ) {}

    public load(): Subscription {
        return this.http
            .get(this.configPath)
            .retry(3)
            .subscribe((d: any) => {
                this.countriesEndpoint = d.endpoints.countriesEndpoint;
                this.regionsEndpoint = d.endpoints.regionsEndpoint;
                this.loggingEndpoint = d.endpoints.loggingEndpoint;
                this.agentId = d.agentId;
                this.config.next(d.endpoints);
            });
    }
}
