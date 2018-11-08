# Stencil components in Angular

[Stencil](https://stenciljs.com/) is not a JS framework. It is a compiler that produces a reusable web component that can be embedded anywhere else.

This is a step by step guide to consume a non-trivial stencil component in an [Angular](https://angular.io/) app.

The starter Angular app was created with [Angular CLI](https://angular.io/guide/quickstart).

## Similar guides
- [Stencil components in React](https://github.com/alesgenova/stenciljs-in-react.git)
- [Stencil components in Vue](https://github.com/alesgenova/stenciljs-in-vue.git)

## Table of contents
- [Add the component(s) to the dependencies](#1-add-the-components-to-the-dependencies)
- [Import the component](#2-import-the-components)
- [Consume the component](#3-consume-the-component)

## 0: Build a stenciljs component and publish it to npm
Creating your first stencil component is very easy and it is well documented [here](https://stenciljs.com/docs/my-first-component). 

This example will consume two components:
- [@openchemistry/molecule-vtkjs](https://github.com/OpenChemistry/oc-web-components/tree/master/packages/molecule-vtkjs) : To display molecular structures
- [split-me](https://github.com/alesgenova/split-me) : To create resizable split layouts

## 1: Add the component(s) to the dependencies

Add the component to the app dependencies in `package.json`

```json
// package.json

"dependencies": {
  ...
  "@openchemistry/molecule-vtkjs": "^0.3.2",
  "split-me": "^1.1.4"
}
```

## 2: Import the component(s)
Import the component in the `main.js` of the app:
```js
import { defineCustomElements as defineMolecule } from '@openchemistry/molecule-vtkjs/dist/loader';
import { defineCustomElements as defineSplitMe } from 'split-me/dist/loader';

defineMolecule(window);
defineSplitMe(window);
```

## 3: Consume the component
To prevent Angular from complaining that there is an unrecognized component tag, add `CUSTOM_ELEMENTS_SCHEMA` to the `schemas` array in `app.module.ts`.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

```

It is now possible to use the tag provided by the stencil component in any template of the app.

```html
<split-me n="2">
  <oc-molecule-vtkjs slot="0" [cjson]="molecule0"></oc-molecule-vtkjs>
  <oc-molecule-vtkjs slot="1" [cjson]="molecule1"></oc-molecule-vtkjs>
</split-me>
```
