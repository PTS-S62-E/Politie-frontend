// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/Backend-Politie/api',
  administrationUrl: 'http://localhost:8080/Rekening-Administratie/api',
  trackingQueueChannel: '/exchange/REKENINGRIJDEN_EXCHANGE/fi.police.trackingUpdate'
};
