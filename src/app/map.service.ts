import { Injectable } from '@angular/core';
import * as geojsonvt from 'geojson-vt';
import * as topojson from 'topojson';
import * as d3 from './bundle-d3';
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
    this.dataService.getData('assets/communes.geo.json').then(response => {
      let geoJSON = response.json();
      let colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"];
      // let colors = ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"];
      // let colors = ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486"];
      var color = d3.scaleThreshold().domain([0.02, 0.04, 0.06, 0.08, 0.10, 0.15]).range(d3.range(7));

      var vectorGrid = L.vectorGrid.slicer(geoJSON, {
			rendererFactory: L.canvas.tile,
			vectorTileLayerStyles: {
				sliced: function(properties, zoom) {
					return {
						fillColor: colors[color(properties.t)],
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

  });
  }

}
