import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MaloneyShow, MaloneyTrack, CurrentTrack } from "../../model/MaloneyShow";

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

  @Input('currentTrack') currentTrack: CurrentTrack;


  constructor() {
  }

}
