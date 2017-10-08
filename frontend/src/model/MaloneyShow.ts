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