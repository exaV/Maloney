import { MusicControlsComponent } from './../../components/music-controls/music-controls';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MaloneyShow } from "../../model/MaloneyShow";
import { MaloneyService } from "../../services/MaloneyService"
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';
@Component({
    selector: 'page-shows',
    templateUrl: 'shows.html'
})
export class ShowsPage {

    shows: MaloneyShow[];
    isAudioPlaying: Boolean = false;
    audioPosition: Number;

    private title;
    private saveDirName = "savedShows";
    private currentTrack: MediaObject;

    private audioIcon = "md-play";

    constructor(public navCtrl: NavController,
        private maloneyService: MaloneyService,
        private navParams: NavParams, ) {
        //TODO title
        this.title = "what";
        this.maloneyService.getRuntypes()
            .then((shows) => this.shows = shows)
            .catch((err) => console.log(err));
    }

    play(show: MaloneyShow) {
        console.log('play');

        if (this.isAudioPlaying == true) {
            this.currentTrack.pause();
            this.isAudioPlaying = false;
            this.audioIcon = "md-play";
            console.log("paused");
        } else {
            console.log("playing " + show.primarySourceUrl)
            this.currentTrack = new Media().create(show.primarySourceUrl);
            //this.currentTrack.errorCallback = function (error: MediaError) { console.log("media error: " + error.code) };
            this.currentTrack.play();
            this.isAudioPlaying = true;
            this.audioIcon = "md-pause";
            console.log("playing");
        }

    }

    controlProgressBar(event) {
        const self = this;
        if (this.isAudioPlaying == true) {
            this.currentTrack.getCurrentPosition().then((position) => {
                this.audioPosition = position;
            })
        }
    }

    save() {
        console.log("save");
        this.initSaveDir();
        let saveDir = new File().dataDirectory;
        //TODO fix path
        new FileTransfer().create().download(this.link, saveDir + this.saveDirName)
            .then((file) => {
                console.log('downlaod succeeded');
                var name = "sfsdfssfasn2n32";
            })
            .catch((err) => {
                console.log('download failed')
                console.log(err)
            });


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
