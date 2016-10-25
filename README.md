# Angular 2 France Unemployment Map

This is an example application demonstrating Angular2 and Leaflet v1.0 integration. The application displays the unemployment rate for all of the French cities.

The application uses the [Leaflet.VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) plugin to display a large geoJSON file (~36000 polygons / 11MB).

# Live Demo

[Live Demo](https://jonasrenault.github.io/france/)

# Data Sources

* The geographic mapping comes from the simplified version of [OpenStreetMap's delimiting of french cities](https://www.data.gouv.fr/fr/datasets/decoupage-administratif-communal-francais-issu-d-openstreetmap/) as of January 1st 2015. This mapping was simplified using [MapShaper](http://mapshaper.org/) to reduce the size of the geoJSON file.

* The unemployment rate values come from [INSEE's 2013 census information](http://www.insee.fr/fr/themes/detail.asp?reg_id=99&ref_id=base-cc-resume-stat).
</p>

# Credits

Some code was adapted from various examples, including :

* [Mike Bostock's](https://bl.ocks.org/mbostock) [Threshold Choropleth](https://bl.ocks.org/mbostock/3306362)
* [Mike Bostock's](https://bl.ocks.org/mbostock) [Threshold Key](https://bl.ocks.org/mbostock/4573883)
* Leaflet's [Interactive Choropleth Map](http://leafletjs.com/examples/choropleth/) example

# Improvements

* Adding mouse interaction would be nice.

# License
Released under the [The MIT License](https://opensource.org/licenses/MIT).
