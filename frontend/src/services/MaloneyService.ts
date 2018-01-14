import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MaloneyShow } from "../model/MaloneyShow";
import request from 'request'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { parse } from "romagny13-html-parser";

/*
  Generated class for the RunServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaloneyService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://www.srf.ch/sendungen/maloney'
  private cachedShows: MaloneyShow[] = [];

  //TODO actually implement


  getRuntypes(): Promise<MaloneyShow[]> {
    //this.scrape();
    //TODO do this properly
    if (this.cachedShows.length > 0) {
      return new Promise((resolve, reject) => resolve(this.cachedShows));
    } else {
      //TODO caching
      return this.fetchFromBackend();

    }

    //   return new Promise((resolve, reject) => resolve([
    //     {
    //       "ID": 1,
    //       "title": "Ein seltsamer Bruder",
    //        "description": "Die Suche nach einem jungen Mann führt Maloney auf das Grundstück von Herrn Wagner, der in einem Blockhaus lebt, und das eigentliche Haus vermietet. Maloney inspiziert das Haus und erlebt dabei eine schmerzhafte Überraschung. Der junge Mann aber bleibt unauffindbar.",
    //        "date_first_air": "2003",
    //        "date_recent_air": "10. September 2017, 11:10"
    //      },
    //      {
    //        "ID": 2,
    //        "title": "Mitten in der Nacht",
    //        "description": "Benjamin Münch ist mitten in der Nacht spurlos verschwunden. Er war zusammen mit Freunden in Grünwil an einem Konzert. Danach gingen alle zurück ins Hotel, doch am nächsten Morgen ist Münch unauffindbar. Sein Bruder befürchtet, dass ihm etwas zugestossen ist.",
    //        "date_first_air": "2012",
    //        "date_recent_air": "3. September 2017, 11:10"
    //      }
    //    ]));
  }

  fetchFromBackend() {
    return this.scrape();
    //const url = "http://localhost:8080/shows"
    //const url = "http://86.119.33.130:8080/backend-0.0.1-SNAPSHOT/shows";
    //console.log("fetching shows from backend at " + url);
    //return this.http.get(url).toPromise() as Promise<MaloneyShow[]>;
  }



  scrape(): Promise<MaloneyShow[]> {
    const url = "https://www.srf.ch/sendungen/maloney/layout/set/ajax/Sendungen/maloney/sendungen";

    //TODO handle async
    console.log("requesting " + url)

    let test = fetch(url).then(res => fetch(url))

    let e = fetch(url).then(res => res.text()).then(s => {
      let nodes = parse(s);

      console.log("nodes");
      console.log(nodes);
      let episodespast = nodes[0]["children"][1]["children"]
      console.log("found " + episodespast.length + " episodes");
      return episodespast
        .map(episode => this.fetchEpisodeDetailsJson(episode["innerHTML"]))
        .map(detailsReq => detailsReq.then(details => this.parseEpisode(details)));
    });

    //TODO check whether we need to check website with timestamp of last request
    //TODO fetch list of ids from website+
    //TODO fetch first 10 items
    //TODO fetch next 10 items (only have to do this once)
    //TODO parse to retrieve ids
    //TODO grab json with episode details for each id
    //TODO save episodes to db-file (make sure to avoid duplicates)
    return e.then(it => Promise.all(it));

  }

  private fetchEpisodeDetailsJson(episode: String): Promise<JSON> {
    let s = episode.match("href=\"https:\/\/www.srf.ch\/play\/radio\/popupaudioplayer\\?id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\"");
    let id = s[0].match("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")[0];

    let url = `https://il.srgssr.ch/integrationlayer/2.0/srf/mediaComposition/audio/${id}.json`;
    console.log(`fetching episode details from ${url}`);
    return fetch(url).then(res => res.text()).then(text => JSON.parse(text));

  }

  private parseEpisode(json: JSON): MaloneyShow {
    console.log("details body");
    console.log(json["chapterList"]);
    let details = json["chapterList"][0];
    let mp3Url = null;
    details["resourceList"].forEach(element => {
      if (element["protocol"] === "HTTPS") {
        mp3Url = element["url"];
      }
    });
    let show: MaloneyShow = new MaloneyShow(details["id"], details["title"], details["lead"], mp3Url)
    console.log(`found show ${show.title} at ${show.primarySourceUrl} (${show.id},${show.description})`)
    return show;
  }
}
