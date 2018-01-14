import { MusicControlsComponent } from './../../components/music-controls/music-controls';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MaloneyShow, MaloneyTrack, CurrentTrack } from "../../model/MaloneyShow";
import { MaloneyService } from "../../services/MaloneyService"
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';
import { assert } from 'assert';
import { Platform } from 'ionic-angular';
import { MusicControls, MusicControlsOptions } from '@ionic-native/music-controls';

@Component({
    selector: 'page-shows',
    templateUrl: 'shows.html',
})
export class ShowsPage {

    tracks: MaloneyTrack[];

    isAudioPlaying: Boolean = false;
    audioPosition: Number;
    currentTrack: CurrentTrack = null;
    musicControls: MusicControls;

    private title;
    private saveDirName = "savedShows";

    constructor(public navCtrl: NavController,
        private maloneyService: MaloneyService,
        private navParams: NavParams,
        platform: Platform) {
        //TODO title
        this.title = "what";
        this.maloneyService.getRuntypes()
            .then((shows) => {
                console.log("received " + shows.length + " shows");
                this.tracks = shows.map(show => new MaloneyTrack(show))
            })
            .catch((err) => console.log(err));
        this.musicControls = new MusicControls();

    }

    play(track: MaloneyTrack) {
        if (this.currentTrack !== null && track === this.currentTrack.track) {
            if (this.isAudioPlaying == true) {
                this.pauseCurrentTrack();
            } else {
                this.resumeCurrentTrack();
            }
        }
        else {
            this.startTrack(track);
        }
    }

    startTrack(track: MaloneyTrack) {
        if (this.isAudioPlaying) this.pauseCurrentTrack(true);
        let url = track.show.primarySourceUrl;
        this.currentTrack = new CurrentTrack(track, new Media().create(url));
        //this.currentTrack.errorCallback = function (error: MediaError) { console.log("media error: " + error.code) };
        this.currentTrack.media.play();
        track.playing = true;
        this.isAudioPlaying = true;
        console.log("starting track " + track.show.title + " (" + url + ")");
        this.musicControls.create({
            track: track.show.title,		// optional, default : ''
            artist: 'Philip Maloney',						// optional, default : ''
            cover: 'icon.png',		// optional, default : nothing
            // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
            //			 or a remote url ('http://...', 'https://...', 'ftp://...')
            isPlaying: true,							// optional, default : true
            dismissable: true,							// optional, default : false

            // hide previous/next/close buttons:
            hasPrev: false,		// show previous button, optional, default: true
            hasNext: false,		// show next button, optional, default: true
            hasClose: true,		// show close button, optional, default: false

            // iOS only, optional
            album: 'Die haarsträubenden Fälle',     // optional, default: ''
            duration: this.currentTrack.media.getDuration(), // optional, default: 0
            elapsed: 10, // optional, default: 0

            hasSkipForward: true, //optional, default: false. true value overrides hasNext.
            hasSkipBackward: true, //optional, default: false. true value overrides hasPrev.
            skipForwardInterval: 15, //optional. default: 0.
            skipBackwardInterval: 15, //optional. default: 0. 

            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated
            ticker: track.show.title
        }).then(controls => {
        }).catch(error => {
            console.log("failed to create music controls: " + error)
        });
        this.musicControls.subscribe().subscribe(action => this.handleMusicControlsEvent(action));
        this.musicControls.listen();
        new MusicControls().destroy()
    }

    pauseCurrentTrack(stop: boolean = false) {
        if (stop) {
            this.currentTrack.media.stop();
            this.musicControls.destroy();
            console.log("paused " + this.currentTrack.track.show.title);
        } else {
            this.currentTrack.media.pause();
            console.log("stopped " + this.currentTrack.track.show.title);
        }
        this.isAudioPlaying = false;
        this.currentTrack.track.playing = false;
        this.musicControls.updateIsPlaying(false);

    }

    resumeCurrentTrack() {
        this.musicControls.updateIsPlaying(true);
        this.isAudioPlaying = true;
        this.currentTrack.track.playing = true;
        this.currentTrack.media.play();
        console.log("resuming " + this.currentTrack.track.show.title);
    }

    handleMusicControlsEvent(action) {

        const message = JSON.parse(action).message;
        switch (message) {
            case 'music-controls-next':
                // Do something
                break;
            case 'music-controls-previous':
                // Do something
                break;
            case 'music-controls-pause':
                this.pauseCurrentTrack();
                break;
            case 'music-controls-play':
                this.resumeCurrentTrack();
                break;
            case 'music-controls-destroy':
                console.log("music-controls-destroy");
                this.pauseCurrentTrack(true);
                break;
            // External controls (iOS only)
            case 'music-controls-toggle-play-pause':
                // Do something
                break;
            case 'music-controls-seek-to':
                const seekToInSeconds = JSON.parse(action).position;
                this.musicControls.updateElapsed({
                    elapsed: seekToInSeconds,
                    isPlaying: true
                });
                this.currentTrack.media.seekTo(seekToInSeconds);
                // Do something
                break;

            // Headset events (Android only)
            // All media button events are listed below
            case 'music-controls-media-button':
                // Do something
                break;
            case 'music-controls-headset-unplugged':
                this.pauseCurrentTrack();
                break;
            case 'music-controls-headset-plugged':
                // Do something
                break;
            default:
                break;
        }
    }


    controlProgressBar(event) {
        const self = this;
        //TODO
    }

    save(track: MaloneyTrack) {
        if (track.saved) {
            console.log("un-saving " + track.show.title);
            track.saved = false;


        } else {


            console.log("saving " + track.show.title);
            this.initSaveDir();
            let saveDir = new File().dataDirectory;
            //TODO fix path
            new FileTransfer().create().download(track.show.primarySourceUrl, saveDir + this.saveDirName)
                .then((file) => {
                    console.log('downlaod succeeded');
                    var name = "sfsdfssfasn2n32";
                })
                .catch((err) => {
                    console.log('download failed')
                    console.log(err)
                });
            track.saved = true;
        }




    }

    initSaveDir() {
        //TODO move to provider
        //mkdir to save audiofile
        var file = new File();
        file.checkDir(file.dataDirectory, this.saveDirName)
            .then((res) => {
                console.log('saved directory already exists :)')
            }).catch((err) => {
                file.createDir(file.dataDirectory, this.saveDirName, false)
                    .then((res) => {
                        console.log("created dir")
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log('createdir in init failed')
                        console.log(err)
                    })
            })
    }

}
