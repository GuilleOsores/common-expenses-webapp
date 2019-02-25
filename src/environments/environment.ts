// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl = 'http://127.0.0.1:8080';

export const environment = {
  production: false,
  api: {
    buildings: baseUrl + '/buildings',
    apartments: baseUrl + '/buildings/:buildingId/apartments',
    invoices: baseUrl + '/buildings/:buildingId/invoices',
    services: baseUrl + '/services',
    roles: baseUrl + '/roles',
    users: baseUrl + '/users',
    auth: {
      '/': baseUrl + '/auth',
      authenticate : baseUrl + '/auth/authenticate',
      authenticate2 : baseUrl + '/auth/authenticate2'
    } 
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
