import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MaloneyShow } from "../../model/MaloneyShow";
import { MaloneyService } from "../../services/MaloneyService"
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
    selector: 'page-shows',
    templateUrl: 'shows.html'
})
export class ShowsPage {

    private shows: MaloneyShow[];

    private title;

    constructor(public navCtrl: NavController, private maloneyService: MaloneyService, private navParams: NavParams) {
        //TODO title
        this.title = "what";
        this.maloneyService.getRuntypes()
            .then((shows) => this.shows = shows)
            .catch((err) => console.log(err));
    }

    play() {
        console.log('play');
    }

    save() {
        console.log("save");
        this.initSaveDir();
        var link = 'https://srfaudio-a.akamaihd.net/delivery/world/a8c7eff0-c341-4f9f-add7-6bbed450375d.mp3?hdnts=exp%3D1505604873~acl%3D%2Fdelivery%2Fworld%2F%2A~hmac%3D99adbd9886ee9c86d96a2b4ec85842a0f27bf90845c258347beb3c54bc509763';
        var saveDir = new File().dataDirectory;
        new FileTransfer().create().download(link, saveDir + 'saved')
            .then((file) => {
                console.log('downlaod succeeded');
                var nativeAudio = new NativeAudio()
                var name = "sfsdfssfasn2n32";
                nativeAudio.preloadSimple(name, file);
                nativeAudio.play(name)
                    .then((success) => console.log('plasyed audio you deaf bastard'))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log('download failed'));


    }

    initSaveDir() {
        //mkdir to save audiofile
        var file = new File();
        file.checkDir(file.dataDirectory, 'saved').then((res) => {
            if (res) {
                console.log('saved directory already exists :)')
            } else {
                file.createDir(file.dataDirectory, 'saved', false).catch((err) => console.log(err))
            }
        }).catch((err) => console.log(err))
    }
}
