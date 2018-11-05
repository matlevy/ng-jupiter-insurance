import { ConsoleLogger } from '../modules/logging/logger/console.logger';
import { LogLevel } from '../modules/logging/loglevel.enum';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logger: [new ConsoleLogger()],
  logLevel: LogLevel.ALL
};
