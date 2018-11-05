import { ILogger } from './logger.interface';

export class ConsoleLogger implements ILogger {
    public info(source: any, ...args): void {
        console.log(`[${this.getClass(source)}]`, args.join(', '));
    }

    public log(source: any, ...args): void {
        console.log(`[${this.getClass(source)}] `, args.join(', '));
    }

    public warn(source: any, ...args): void {
        console.warn(`[${this.getClass(source)}] `, args.join(', '));
    }

    public error(source: any, ...args): void {
        console.error(`[${this.getClass(source)}] `, args.join(', '));
    }

    public clear(): void {
        console.clear();
    }

    private getClass(input: any): string {
        if (input.constructor.name) {
            return input.constructor.name;
        }
        return 'UNKNOWN';
    }
}
