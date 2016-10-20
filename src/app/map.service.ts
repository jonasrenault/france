import { Injectable } from '@angular/core';
import * as geojsonvt from 'geojson-vt';
import * as topojson from 'topojson';
declare var L: any;
import { DataService } from './data.service';


@Injectable()
export class MapService {

  private map: L.Map;
  private config: Object;
  private htmlElement: HTMLElement;
  constructor(private dataService: DataService) {
    this.config = {
        center: [46.6, 2.1],
        zoom: 6,
        minZoom: 1
        // maxZoom: 9,
        // scrollWheelZoom: true
    };
  }

  public setup(htmlElement: HTMLElement): void {
    this.htmlElement = htmlElement;
    this.buildMap();
    this.getTopo();
  }

  private buildMap(): void {
    this.map = L.map(this.htmlElement, this.config);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', <L.TileLayerOptions> {subdomains: "abcd", detectRetina: true, attribution: '<a href="https://www.mapzen.com/rights">Attribution.</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'}).addTo(this.map);
  }

  private addGeoLayer(): void {

  }

  private getTopo(): void {
    this.dataService.getData('assets/communes.json').then(response => {
      let geoJSON = response.json();

      var vectorGrid = L.vectorGrid.slicer(geoJSON, {
			rendererFactory: L.canvas.tile,
			vectorTileLayerStyles: {
				sliced: function(properties, zoom) {
					var p = properties.insee % 5;
					return {
						fillColor: p === 0 ? '#800026' :
								p === 1 ? '#E31A1C' :
								p === 2 ? '#FEB24C' :
								p === 3 ? '#B2FE4C' : '#FFEDA0',
						fillOpacity: 0.7,
						stroke: true,
						fill: true,
						color: 'black',
// 							opacity: 0.2,
						weight: 0,
					}
				}
			}
		}).addTo(this.map);

      // let topos = topojson.feature( geoJSON, geoJSON.objects['COMMUNE'] );
      // console.log(topos);
      // L.geoJSON(topos).addTo(this.map);
    })
  }

}
