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

    private shows: MaloneyShow[];

    private title;
    private saveDirName = "savedShows";
    private link = 'https://srfaudio-a.akamaihd.net/delivery/world/a8c7eff0-c341-4f9f-add7-6bbed450375d.mp3?hdnts=exp%3D1505604873~acl%3D%2Fdelivery%2Fworld%2F%2A~hmac%3D99adbd9886ee9c86d96a2b4ec85842a0f27bf90845c258347beb3c54bc509763';
    private currentTrack: MediaObject;
    private isAudioPlaying: Boolean = false;
    private audioPosition: Number;
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

    play() {
        console.log('play');

        if (this.isAudioPlaying == true) {
            this.currentTrack.pause();
            this.isAudioPlaying = false;
            this.audioIcon = "md-play";
            console.log("paused");
        } else {
            this.currentTrack = new Media().create(this.link);
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
        var link = 'https://srfaudio-a.akamaihd.net/delivery/world/a8c7eff0-c341-4f9f-add7-6bbed450375d.mp3?hdnts=exp%3D1505604873~acl%3D%2Fdelivery%2Fworld%2F%2A~hmac%3D99adbd9886ee9c86d96a2b4ec85842a0f27bf90845c258347beb3c54bc509763';
        var saveDir = new File().dataDirectory;
        //TODO fix path
        new FileTransfer().create().download(link, saveDir + this.saveDirName)
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
