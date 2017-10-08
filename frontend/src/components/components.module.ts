import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MusicControlsComponent } from './music-controls/music-controls';
import { ShrinkingSegmentHeader } from './shrinking-segment-header/shrinking-segment-header';
import { TextShrinkComponent } from './text-shrink/text-shrink';
@NgModule({
    declarations: [
        MusicControlsComponent,
        ShrinkingSegmentHeader,
        TextShrinkComponent
    ],
    imports: [IonicModule.forRoot(MusicControlsComponent)
    ],
    exports: [
        MusicControlsComponent,
        ShrinkingSegmentHeader,
        TextShrinkComponent]
})
export class ComponentsModule { }
