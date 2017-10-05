import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MusicControlsComponent } from './music-controls/music-controls';
@NgModule({
	declarations: [
	MusicControlsComponent
],
	imports: [    IonicModule.forRoot(MusicControlsComponent)
	],
	exports: [
    MusicControlsComponent]
})
export class ComponentsModule {}
