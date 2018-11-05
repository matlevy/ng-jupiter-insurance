import { IErrorReporter, ErrorLoggingReport } from '../service/http/error-logging-http.service';
import { Observable } from 'rxjs/Observable';
import { Guid } from '../util/guid';
import { ErrorReportLogger, ErrorReportOptions } from './error-reporter.logger';
import { Ng2DeviceService } from 'ng2-device-detector';

export class MockReporter implements IErrorReporter {
    report(error: ErrorLoggingReport ): Observable<ErrorLoggingReport> {
        return Observable.of(error);
    }
}

describe('ErrorReportLogger', () => {

    let mockReporter: MockReporter;
    let logger: ErrorReportLogger;

    beforeEach(() => {
        mockReporter = new MockReporter();
        logger = new ErrorReportLogger(mockReporter, new Ng2DeviceService() );
    });

    it('should be created', () => {
        expect(mockReporter).not.toBeNull();
        expect(logger).not.toBeNull();
    });

    it('should pass an error report to the reporter when the error method is called', () => {
        spyOn(mockReporter, 'report').and.returnValue(Observable.of({}));
        logger.error(this, 'error message');
        expect(mockReporter.report).toHaveBeenCalled();
    });

    it('should pass a verbose report to the reporter when the log method is called', () => {
        spyOn(mockReporter, 'report').and.returnValue(Observable.of({}));
        logger.log(this, 'error message');
        expect(mockReporter.report).toHaveBeenCalled();
    });

    it('should set an individual option when the setOption method is called', () => {
        logger.setOption('agentId', 253);
        expect(logger.options.agentId).toBe(253);
    });

    it('should set all options when the setOptions method is called', () => {
        const options: ErrorReportOptions = {
            agentId: 25434
        };
        logger.setOptions(options);
        expect(logger.options).toEqual(options);
        expect(logger.options.agentId).toEqual(25434);
    });

    it('should pass the correct information to the reporter', () => {
        let result: ErrorLoggingReport = null;
        const testReporter: IErrorReporter = {
            report(error: ErrorLoggingReport): Observable<ErrorLoggingReport> {
                result = error;
                return Observable.of(error);
            }
        };
        const options: ErrorReportOptions = {
            agentId: 234,
            applicationName: 'test',
            quoteNumber: '243',
            userId: '22'
        };
        logger = new ErrorReportLogger(testReporter, new Ng2DeviceService());
        logger.error({}, 'test error');
        expect(result.agentId).toBe(0);
        logger.setOptions(options);
        logger.error({}, 'test error');
        expect(result.agentId).toBe(options.agentId);
        expect(result.location).toBe('Object');
        expect(result.message).toBe('test error');
        expect(result.errorReference.length).toBe(12);
        expect(result.logType).toBe('Error');
    });

});

