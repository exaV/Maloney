import { Component } from '@angular/core';

import { ShowsPage } from '../../pages/shows/shows'
import { SavedPage } from '../../pages/saved/saved';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShowsPage;
  tab2Root = SavedPage;
  constructor() {

  }
}
