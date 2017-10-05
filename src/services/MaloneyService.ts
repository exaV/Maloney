import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { MaloneyShow } from "../model/MaloneyShow";
import htmlparser from 'htmlparser2'
import request from 'request'

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

  //TODO actually implement


  getRuntypes(): Promise<MaloneyShow[]> {
    this.scrape();

    return new Promise((resolve, reject) => resolve([
      {
        "ID": 1,
        "title": "Ein seltsamer Bruder",
        "description": "Die Suche nach einem jungen Mann führt Maloney auf das Grundstück von Herrn Wagner, der in einem Blockhaus lebt, und das eigentliche Haus vermietet. Maloney inspiziert das Haus und erlebt dabei eine schmerzhafte Überraschung. Der junge Mann aber bleibt unauffindbar.",
        "date_first_air": "2003",
        "date_recent_air": "10. September 2017, 11:10"
      },
      {
        "ID": 2,
        "title": "Mitten in der Nacht",
        "description": "Benjamin Münch ist mitten in der Nacht spurlos verschwunden. Er war zusammen mit Freunden in Grünwil an einem Konzert. Danach gingen alle zurück ins Hotel, doch am nächsten Morgen ist Münch unauffindbar. Sein Bruder befürchtet, dass ihm etwas zugestossen ist.",
        "date_first_air": "2012",
        "date_recent_air": "3. September 2017, 11:10"
      }
    ]));
  }


  scrape() {
    const url = "https://www.srf.ch/sendungen/maloney/layout/set/ajax/Sendungen/maloney/sendungen";

    //TODO handle async
    console.log("requesting " + url)


    fetch(url, { mode: 'no-cors' })
      .then(res => {

        console.log("request succeeded");
        console.log(res)
        console.log(res.status)




      }).catch(error => console.log(error))


    //TODO check whether we need to check website with timestamp of last request
    //TODO fetch list of ids from website
    //TODO fetch first 10 items
    //TODO fetch next 10 items (only have to do this once)
    //TODO parse to retrieve ids
    //TODO grab json with episode details for each id
    //TODO save episodes to db-file (make sure to avoid duplicates)


  }





}
