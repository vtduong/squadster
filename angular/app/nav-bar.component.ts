import {Component, ViewEncapsulation, OnInit} from "@angular/core";
//import {Routes} from "./../../config/route.config";
@Component({
    selector: "topnav",
    //templateUrl: "app/main/topNavbar/TopNavbar.html",
    template: `
      <div class="topnav">
        <div id="logo">
          <img src="../images/SquadsterLogo.png" />
        </div>
        <ul>
          <li><a routerLink="/list-view" routerLinkActive="active">List View</a></li>
          <li><a routerLink="/create-event" routerLinkActive="active">Create Event</a></li>
          <li><a routerLink="/my-events" routerLinkActive="active">My Events</a></li>
          <li> My Account </li>
        </ul>
      </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
      .topnav{
        white-space: nowrap;
        overflow: hidden;
      }
      .topnav ul {
        list-style: none;
        background-color: #444;
        text-align: center;
        margin: 0;
        padding: 0;
        height: 5%;
      }
      .topnav li {
        line-height: 40px;
        border-bottom: 1px solid #888;
        display: inline-block;
        front-size: 1.2em;
        height: 5%;
        width: 20%;
        //margin-top: 30px;
      }
      .topnav a {
        text-decoration: none;
        color: #fff;
        display: block;
        transition: .3s background-color;
      }
      .topnav a:hover {
        background-color: #005f5f;
      }
      .topnav a.active {
        background-color: #fff;
        color: #333;
        cursor: default;
      }
      #logo img{
        height: 5%;
        width: 10%;
        float: left;
        margin-left: 5px;
      }
    `],
})

/*export class TopNavbarComponent  {
    showNavBar: boolean = false;


    constructor(private globalEventsManager: GlobalEventsManager) {
        this.globalEventsManager.showNavBar.subscribe((mode)=>{
            this.showNavBar = mode;
        });

    }


}*/

export class NavBarComponent { }