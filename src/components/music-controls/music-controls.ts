import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the MusicControlsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'music-controls',
  templateUrl: 'music-controls.html'
})
export class MusicControlsComponent {

  text: string;
  audioPosition : Number = 0

  constructor() {
  }

}
