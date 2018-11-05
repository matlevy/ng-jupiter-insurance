export interface ILogger {
    info(source: any, ...args);
    log(source: any, ...args);
    warn(source: any, ...args);
    error(source: any, ...args);
    clear();
}
