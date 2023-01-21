import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as engine from 'retro-engine';

(window as any).engine = engine;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));