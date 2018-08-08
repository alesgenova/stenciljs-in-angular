import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements as defineMolecule } from '@openchemistry/molecule-vtkjs';
import { defineCustomElements as defineSplitMe } from 'split-me';

defineMolecule(window);
defineSplitMe(window);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
