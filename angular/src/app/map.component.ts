import { Component, OnInit } from '@angular/core';
import { MouseEvent } from 'angular2-google-maps/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Event } from './event';
import { EventService } from './event.service';

declare var google: any;

@Component({
    selector: 'map',
    templateUrl: 'html/map.component.html',
    styleUrls: ['styles/map.component.css'],
})

export class MapComponent implements OnInit {
    title: string = 'Events Nearby';
    lat: number = 50;
    lon: number = -50;
    zoom: number = 14;
    radius: number = 1609.34;
    circleColor: string = '#5DFC0A';
    events: Event[];
    s: string;

    //1 mile = 1609.34 meters
    mile = 1609.34;
    //radius: number = 20;
    location = {};
    distances = ['1 mile', '5 miles', '10 miles', '15 miles'];
    distanceSelected = this.distances[0];
    d_int = null;

    //TODO: take pre-populated events out and use events from the API
    //this should be replaced by events received from the API
    markers: marker[] = [
        {
            event_id: 5,
            lat: 35.771673,
            lon: -78.673835,
            title: 'Coffee Hangout',
            iconUrl: 'assets/images/miniSLogo.png',
            date: new Date().toLocaleString()
        },
        {
            event_id: 2,
            lat: 35.779600,
            lon: -78.675779,
            title: 'Watch Doctor Strange',
            iconUrl: 'assets/images/miniSLogo.png',
            date: new Date().toLocaleString()
        },
        {
            event_id: 3,
            lat: 35.771238,
            lon: -78.674408,
            title: 'Pickup Frisby',
            iconUrl: 'assets/images/miniSLogo.png',
            date: null
        }
    ];

    //when users click on the map, a new pin will be shown and added to this array to keep track of the info
    newPins: marker[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService
    ) { }

    getEvents() {
        this.markers = [];
        this.eventService.getEvents(this.lat, this.lon, this.d_int, this.s).then(events => {
            for (let i of events) {
                i.coordinates = i.coordinates.replace('[', '');
                i.coordinates = i.coordinates.replace(']', '');
                let ar = i.coordinates.replace(',', '').split(" ");
                this.markers.push({
                    event_id: i.event_id,
                    lat: parseFloat(ar[0]),
                    lon: parseFloat(ar[1]),
                    iconUrl: 'assets/images/miniSLogo.png',
                    date: i.date.toLocaleString(),
                    title: i.title
                });
            }
        });
    }

    setPosition(position) {
        this.location = position.coords;
        this.updateCurrentLatLon(position.coords.latitude, position.coords.longitude);
    }

    updateCurrentLatLon(latitude, longitude) {
        this.lat = latitude;
        this.lon = longitude;
        this.getEvents();
    }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            this.s = params['s'] || '';
            if (!+params['lat'] || !+params['lon'] || !+params['radius']) {
                this.d_int = 1;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
                }
            }
            else {
                this.lat = +params['lat'];
                this.lon = +params['lon'];
                this.d_int = +params['radius'];
                this.getEvents();
            }
            this.changeZoom();
        });
    }

    mapClicked($event: MouseEvent) {
        this.newPins.pop();
        this.newPins.push({
            event_id: null,
            lat: $event.coords.lat,
            lon: $event.coords.lng,
            iconUrl: 'assets/images/miniSLogo.png',
            title: ('Create event at: ' + $event.coords.lat + ', ' + $event.coords.lng),
            date: null
        });
    }

    changeZoom() {
        this.radius = this.d_int * this.mile;
        if (this.d_int == 5) {
            this.zoom = 12;
        }
        else if (this.d_int == 10) {
            this.zoom = 11;
        }
        else if (this.d_int == 15 || this.d_int == 25) {
            this.zoom = 10;
        }
        else {
            this.zoom = 14;
        }
    }

    dragEnd($event: MouseEvent) {
        this.updateCurrentLatLon($event.coords.lat, $event.coords.lng);
    }

    host(lat: number, lon: number) {
        this.router.navigate(['../app/create-event'], { queryParams: { lat: lat, lon: lon } });
    }

    //TODO: update query params with proper event ID's from the API
    eventDetails(event_id: number) {
        this.router.navigate(['../app/event-details'], { queryParams: { id: event_id } });
    }
}

// just an interface for type safety.
interface marker {
    event_id: number;
    lat: number;
    lon: number;
    title?: string;
    iconUrl: string;
    date: string;
}
