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
    private colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"];
    private domain = [0.02, 0.04, 0.06, 0.08, 0.10, 0.15];
    private range = d3.range(this.colors.length);
    private colorScale: d3.ScaleThreshold<number, number>;
    private vectorGrid: any;
    private htmlElement: HTMLElement;
    constructor(private dataService: DataService) {
        this.config = {
            center: [46.6, 2.1],
            zoom: 6,
            minZoom: 1
            // maxZoom: 9,
            // scrollWheelZoom: true
        };
        this.colorScale = d3.scaleThreshold().domain(this.domain).range(this.range);
    }

    public setup(htmlElement: HTMLElement): void {
        this.htmlElement = htmlElement;
        this.buildMap();
        this.getTopo();
        this.buildLegend();
    }

    private buildMap(): void {
        this.map = L.map(this.htmlElement, this.config);
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', <L.TileLayerOptions>{ subdomains: "abcd", detectRetina: true, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map);
    }

    private getTopo(): void {
        this.dataService.getData('assets/communes.geo.json').then(response => {
            let geoJSON = response.json();

            this.vectorGrid = L.vectorGrid.slicer(geoJSON, {
                rendererFactory: L.canvas.tile,
                vectorTileLayerStyles: {
                    sliced: (properties, zoom) => {
                        return {
                            fillColor: this.colors[this.colorScale(properties.t)],
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

    private buildLegend(): void {
        // Add a legend box to the map
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = (map) => {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = '<div class="header">Unemployment rate</div>';

            return div;
        };
        legend.addTo(this.map);

        // Build legend svg with d3
        const svg = d3.select(".legend").append("svg")
            .attr("width", 250)
            .attr("height", 50);

        const g = svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate( 25, 20)");

        // A position encoding for the key only.
        const x = d3.scaleLinear()
            .domain([0, .4])
            .range([0, 200]);

        const xAxis = d3.axisBottom(x)
            .tickSize(13)
            .tickValues(this.domain)
            .tickFormat((d: number) => (d * 100).toFixed(0) + (d === .15 ? '%' : ''));

        g.selectAll("rect")
            .data(this.range.map((idx) => {
                var d = this.colorScale.invertExtent(idx);
                if (d[0] == null) d[0] = x.domain()[0];
                if (d[1] == null) d[1] = x.domain()[1];
                return d;
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", (d:number[]) => x(d[0]))
            .attr("width", (d: number[]) => x(d[1]) - x(d[0]))
            .style("fill", (d: number[]) => this.colors[this.colorScale(d[0])]);

        g.call(xAxis);
    }

}
