// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD3aNa2rhT3WcBOLV1qV7eAV2Eu5dFmOtY',
    authDomain: 'smart-prototype.firebaseapp.com',
    databaseURL: 'https://smart-prototype.firebaseio.com',
    projectId: 'smart-prototype',
    storageBucket: 'smart-prototype.appspot.com',
    messagingSenderId: '592719147734'
  }
};
