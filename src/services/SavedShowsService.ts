import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { MaloneyShow } from "../model/MaloneyShow";

@Injectable()
export class SavedShowsService {

    constructor() {
    }

    //TODO actually implement
    getSavedFiles() {

    }

    getRuntypes(): Promise<MaloneyShow[]> {
        return new Promise((resolve, reject) => resolve([
            {
                "ID": 3,
                "title": "Saved Show",
                "description": "Die Suche nach einem jungen Mann führt Maloney auf das Grundstück von Herrn Wagner, der in einem Blockhaus lebt, und das eigentliche Haus vermietet. Maloney inspiziert das Haus und erlebt dabei eine schmerzhafte Überraschung. Der junge Mann aber bleibt unauffindbar.",
                "date_first_air": "2003",
                "date_recent_air": "10. September 2017, 11:10"
            }
        ]));
    }
}
