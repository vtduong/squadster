import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {CreateComponent} from './create.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    styleUrls: ['app/styles/master-styles.css', 'app/styles/mapswitch.css'],
    //state which components are used in the template.
    //directives: [CreateComponent]
})
export class AppComponent {
    private _open: boolean = false;
    isChecked = false;

    constructor(public router: Router) { }

    isEdited() {
      if (this.router.url == "/app/list-view" || this.router.url == "/app/map-view")
        return true;
      return false;
    }

    check() {
        if (this.router.url == "/app/list-view") {
          this.isChecked = false;
        }
        else if (this.router.url == "app/map-view") {
          this.isChecked = true;
        }
        return this.isChecked;
    }

    toggle() {
        if (this.router.url == "/app/list-view") {
          this.router.navigate(["app/map-view"]);
        }
        else {
          this.router.navigate(["app/list-view"]);
        }
    }

    private _toggleSidebar() {
        this._open = !this._open;
    }
}
