import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MusicControlsComponent } from './music-controls/music-controls';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
@NgModule({
	declarations: [
	MusicControlsComponent,
    ShrinkingSegmentHeaderComponent
],
	imports: [    IonicModule.forRoot(MusicControlsComponent)
	],
	exports: [
    MusicControlsComponent,
    ShrinkingSegmentHeaderComponent]
})
export class ComponentsModule {}
