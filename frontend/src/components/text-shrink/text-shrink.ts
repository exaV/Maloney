import { Component, Input } from '@angular/core';

/**
 * Generated class for the TextShrinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'text-shrink',
  templateUrl: 'text-shrink.html'
})
export class TextShrinkComponent {

  @Input("text") text: string;
  shouldShow = false;

  constructor() {
  }

}
