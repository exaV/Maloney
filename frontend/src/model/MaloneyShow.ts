import { Media, MediaObject } from '@ionic-native/media';

export class MaloneyShow {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly primarySourceUrl: string;
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
