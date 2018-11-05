import { ILogger } from '../../modules/logging/logger/logger.interface';
import { IErrorReporter, ErrorLoggingReport } from '../service/http/error-logging-http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { FormComponentsConfig } from '../../modules/form-components/form-components.config';
import { FormConfigLoaderService } from '../../modules/form-components/service/form-config-loader.service';
import { Ng2DeviceService } from 'ng2-device-detector';
import { Guid } from '../util/guid';
export interface ErrorReportOptions {
    agentId?: number;
    applicationName?: string;
    userId?: string;
    location?: string;
    quoteNumber?: string;
}

/**
 * @whatItDoes Acts as a bridge between the ErrorLoggingHttpService and the Logger framework
 *
 * @howToUse
 *
 * To use, create an instance of the ErrorReportLogger and inject instances of the FormConfigLoaderService,
 * and IErrorReporter instance and the Ng2DeviceService. Add the newly created instance to the Logging framework
 * by using the addLogger method of the LoggerService
 */
export class ErrorReportLogger implements ILogger {

    private _options: ErrorReportOptions = {};
    private optionsSubject: Subject<ErrorReportOptions> = new Subject();
    private user = Guid.newGuid();

    public get options(): ErrorReportOptions {
        return this._options;
    }

    constructor(
        private reporter: IErrorReporter,
        private device: Ng2DeviceService
    ) {}

    /**
     * Collectively sets all options for reporting given default values set with and ErrorReportOptions instance
     * @param options ErrorReportOptions instance containing the defaukt values for Logging 
     */
    public setOptions(options: ErrorReportOptions): void {
        this._options = options;
        this.optionsSubject.next(this.options);
    }

    /**
     * Sets and individual option value given the option key and the new value
     * @param option The key of the option to be set
     * @param value The new value of the option
     */
    public setOption(option: string, value: any): void {
        this._options = this.options == null ? {} : this.options;
        this.options[option] = value;
        this.optionsSubject.next(this.options);
    }

    /**
     * Returns a Subject from which an Observer instance can be created to Observe changes
     * in reporting options.
     */
    public get reportOptions(): Subject<ErrorReportOptions> {
        return this.optionsSubject;
    }

    public error(source: any, ...args) {
        this.track('Error', source, args);
    }

    public log(source: any, ...args) {
        this.track('Verbose', source, args);
    }

    public info(source: any, ...args) {}
    public warn(source: any, ...args) {}
    public clear() {}

    private track(type: string, source: any, ...args) {
        const errorId = Guid.newGuid();
        const report: ErrorLoggingReport = {
            agentId: this.options.agentId | 0,
            applicationName: this.options.applicationName,
            location: source ? source.constructor.name : 'unknown',
            logType: type,
            message: args.toString(),
            quoteNumber: this.options.quoteNumber,
            userAgent: this.device.userAgent,
            userId: this.user
        };
        if (type === 'Error') {
            report.errorReference = errorId.slice(errorId.length - 12, errorId.length);
        }
        this.reporter.report(report).subscribe();
    }
}
