import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from '../src/app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('ngsw-worker.js').then(() => {
        console.log('Service worker regsitered');
    })
    .catch(err => console.error('Service worker registration failed with:', err));
  });
}})
.catch(err => console.error(err));
