import { Media, MediaObject } from '@ionic-native/media';
import { preserveWhitespacesDefault } from '@angular/compiler/src/config';

export class MaloneyShow {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly primarySourceUrl: string;

    constructor(id: string, title: string, description: string, primarySourceUrl: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.primarySourceUrl = primarySourceUrl;
    }
}

export class MaloneyTrack {
    readonly show: MaloneyShow;
    playing: boolean = false;
    saved: boolean = false;

    constructor(show: MaloneyShow) {
        this.show = show;
    }
}

export class CurrentTrack {
    readonly track: MaloneyTrack;
    readonly media: MediaObject;
    audioPosition: Number = 0;

    constructor(track: MaloneyTrack, media: MediaObject) {
        this.track = track;
        this.media = media;
    }
}
