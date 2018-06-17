# Stencil components in Angular

[Stencil](https://stenciljs.com/) is not a JS framework. It is a compiler that produces a reusable web component that can be embedded anywhere else.

This is a step by step guide to consume a non-trivial stencil component in an [Angular](https://angular.io/) app.

The starter Angular app was created with [Angular CLI](https://angular.io/guide/quickstart).

## Similar guides
- [Stencil components in React](https://github.com/alesgenova/stenciljs-in-react.git)
- [Stencil components in Vue](https://github.com/alesgenova/stenciljs-in-vue.git)

## Table of contents
- [Add the component to the dependencies](#1-add-the-component-to-the-dependencies)
- [Load the component](#2-load-the-component)
- [Consume the component](#3-consume-the-component)

## 0: Build a stenciljs component and publish it to npm
Creating your first stencil component is very easy and it is well documented [here](https://stenciljs.com/docs/my-first-component). 

This example will consume the [@openchemistry/molecule-moljs](https://github.com/OpenChemistry/oc-web-components/tree/master/packages/molecule-moljs) component.

## 1: Add the component to the dependencies

Add the component to the app dependencies in `package.json`

```json
// package.json

"dependencies": {
  ...
  "@openchemistry/molecule-moljs": "^0.0.7"
}
```

In order to have the component code bundled with the app, copy the `dist/` folder of the component into the `assets/` folder of the app. This can be automated by adding a an element to the assets array in `angular.json` file.

```json
// angular.json

{
  ... ,
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          ... ,
          "options": {
            ... ,
            "assets": [
              ... ,
              { "glob": "**/*", "input": "node_modules/@openchemistry/molecule-moljs/dist", "output": "/assets/molecule-moljs" }
              
            ],
            ... ,
          }
        }
      }
    }
  }
}
```

## 2: Load the component
Now that the component code is in the `assets/molecule-moljs` folder, add the following to the `src/index.html` file.
```html
<script src='assets/molecule-moljs/molecule-moljs.js'></script>
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
<oc-molecule-moljs [cjson]="molecule"></oc-molecule-moljs>
```
