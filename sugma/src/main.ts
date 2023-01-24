import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as engine from 'retro-engine';

(window as any).engine = engine;

// importing using a static path
(
    async function() {
        const m = await import("../../sugma/projects/project1/scripts/components/Position.js");
        const pos = m.default;
        console.log("from static path: \n" + pos);
    }
)();

// importing using path only known at runtime
let path = "../../sugma/projects/project1/scripts/components/Position.js";
(
    async function() {
        const m = await import(path);
        const pos = m.default;
        console.log("from dynamic path: \n" + pos);
    }
)();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));