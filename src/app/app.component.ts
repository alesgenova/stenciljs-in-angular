import { Component } from '@angular/core';

import { BenzeneWithHomo, Caffeine } from '@openchemistry/sample-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  molecules = [BenzeneWithHomo, Caffeine];
}
