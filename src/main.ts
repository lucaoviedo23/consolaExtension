import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

interface GlobalConfig {
  apiServiceBaseUri: string,
  apiAuthServiceBaseUri: string,
  apligemUrl: string
}

declare var globalConfig: any;

if (environment.production) {
  enableProdMode();
}
environment.apiServiceBaseUri = globalConfig.apiServiceBaseUri;
environment.apiAuthServiceBaseUri = globalConfig.apiAuthServiceBaseUri;
environment.apligemUrl = globalConfig.apligemUrl;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
