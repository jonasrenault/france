import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable()
export class MapService {

  private map: L.Map;
  private config: Object;
  private htmlElement: HTMLElement;
  constructor() {
    this.config = {
        center: [46.6, 2.1],
        zoom: 6,
        minZoom: 1,
        maxZoom: 9,
        scrollWheelZoom: 0
    };
  }

  public setup(htmlElement: HTMLElement): void {
    this.htmlElement = htmlElement;
    this.buildMap();
  }

  private buildMap(): void {
    this.map = L.map(this.htmlElement, this.config);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', <L.TileLayerOptions> {subdomains: "abcd", detectRetina: true, attribution: '<a href="https://www.mapzen.com/rights">Attribution.</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'}).addTo(this.map);
  }

}
