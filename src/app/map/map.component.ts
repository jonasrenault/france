import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapService } from '../map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

    @ViewChild('container') element: ElementRef;
    private htmlElement: HTMLElement;
    private config: Object;

    constructor(private mapService: MapService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.htmlElement = this.element.nativeElement;
        this.mapService.setup(this.htmlElement);
    }

}
