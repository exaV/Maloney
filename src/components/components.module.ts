import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { ProgressBarComponent } from './progress-bar/progress-bar';
import { MusicControlsComponent } from './music-controls/music-controls';
@NgModule({
	declarations: [ProgressBarComponent,
    MusicControlsComponent],
	imports: [    IonicModule.forRoot(MusicControlsComponent)
	],
	exports: [ProgressBarComponent,
    MusicControlsComponent]
})
export class ComponentsModule {}
