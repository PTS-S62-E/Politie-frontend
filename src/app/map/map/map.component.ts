import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MapInput} from '../../classes/MapInput';
import {ITranslocation} from '../../classes/Translocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  public mapInput: MapInput;

  public visible: boolean = true;

  constructor() {
  }

  ngOnInit() {
    if (this.mapInput == null) {
      this.mapInput = new MapInput();
      this.mapInput.center = {
        lat: 51.4508747,
        lng: 5.4781492
      };
      this.mapInput.locations.push({
        lat: 51.4508747,
        lng: 5.4781492
      });

      this.mapInput.locations.push({
        lat: 51.5508747,
        lng: 5.5781492
      });

      this.mapInput.locations.push({
        lat: 51.6508747,
        lng: 5.681492
      });
    }

    const map = L.map('leafletmap').setView([this.mapInput.center.lat, this.mapInput.center.lng], 13);
    console.log(map);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(map);

    this.mapInput.locations
      .forEach(value => {
        L.circle(value, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(map);
      });
    this.drawLines(this.mapInput.locations, map);
  }

  public drawLines(locations: ITranslocation[], map: L.Map) {
    if (locations.length < 2) {
      throw Error('Need at least 2 locations');
    }
    const latlngs = [];
    for (let i = 0; i < locations.length-1; i++) {
      const firstLocation = locations[i];
      const secondLocation = locations[i + 1];
      latlngs.push([firstLocation, secondLocation]);
    }
    L.polyline(latlngs, {color: 'red'}).addTo(map);
  }
}
