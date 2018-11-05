import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http/';
import { FormConfigLoaderService } from '../../../modules/form-components/service/form-config-loader.service';

export interface ErrorLoggingReport {
  agentId: number;
  applicationName: string;
  message: string;
  userAgent: string;
  userId: string;
  errorReference?: string;
  location: string;
  logType: string;
  quoteNumber: string;
}

export interface IErrorReporter {
  report(error: ErrorLoggingReport ): Observable<ErrorLoggingReport>;
}

/**
 * @whatItDoes Provides methods to report errors
 *
 * @howToUse
 *
 * To use, inject ErrorLoggingHttpService into your component class. You can then call its methods
 * directly.
 */
@Injectable()
export class ErrorLoggingHttpService {

  constructor(
    private http: HttpClient,
    private config: FormConfigLoaderService
  ) { }

  /**
   * Submits a log report to the configured HTTP service. The endpoint for the service will be defined in the
   * external confiuration file.
   * @param error The ErrorLogginfReport instance containing the meta for the remote logging report
   */
  public report(error: ErrorLoggingReport): Observable<any> {
    if (this.config.loggingEndpoint) {
      return this.http.post(this.config.loggingEndpoint, error)
        .retry(3);
    } else {
      return Observable.of({})
        .flatMap(o => this.config.config.asObservable())
        .flatMap((c) => {
          return this.http.post(this.config.loggingEndpoint, error);
        });
    }
  }

}
