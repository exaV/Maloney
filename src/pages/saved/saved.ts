import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MaloneyShow } from "../../model/MaloneyShow";
import { SavedShowsService } from "../../services/SavedShowsService"

@Component({
    selector: 'page-saved',
    templateUrl: 'saved.html'
})
export class SavedPage {


    constructor(public navCtrl: NavController, private savedShowService: SavedShowsService, private navParams: NavParams) {
        //TODO title
        this.savedShowService.getRuntypes().then((shows) => this.shows = shows).catch((err) => console.log(err));
    }

    play() {
        console.log('play');
    }

    remove() {
        console.log("remove from saved")
    }
}
