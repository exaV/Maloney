import { MusicControlsComponent } from './../../components/music-controls/music-controls';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MaloneyShow, MaloneyTrack, CurrentTrack } from "../../model/MaloneyShow";
import { MaloneyService } from "../../services/MaloneyService"
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';
import { assert } from 'assert';



@Component({
    selector: 'page-shows',
    templateUrl: 'shows.html',
})
export class ShowsPage {

    tracks: MaloneyTrack[];

    isAudioPlaying: Boolean = false;
    audioPosition: Number;
    currentTrack: CurrentTrack = null;


    private title;
    private saveDirName = "savedShows";

    constructor(public navCtrl: NavController,
        private maloneyService: MaloneyService,
        private navParams: NavParams, ) {
        //TODO title
        this.title = "what";
        this.maloneyService.getRuntypes()
            .then((shows) => {
                console.log("received " + shows.length + " shows");
                this.tracks = shows.map(show => new MaloneyTrack(show))
            })
            .catch((err) => console.log(err));
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
        console.log("starting track " + track.show.title + " (" + url + ")")
    }

    pauseCurrentTrack(stop: boolean = false) {
        if (stop) {
            this.currentTrack.media.stop();
            console.log("paused " + this.currentTrack.track.show.title);
        } else {
            this.currentTrack.media.pause();
            console.log("stopped " + this.currentTrack.track.show.title);
        }
        this.isAudioPlaying = false;
        this.currentTrack.track.playing = false;
    }

    resumeCurrentTrack() {
        this.isAudioPlaying = true;
        this.currentTrack.track.playing = true;
        this.currentTrack.media.play();
        console.log("resuming " + this.currentTrack.track.show.title);

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
