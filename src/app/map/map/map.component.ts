import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MapInput} from '../../classes/MapInput';

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
        L.popup()
          .setLatLng(value)
          .setContent('Area of John Doe')
          .openOn(map);
        L.circle(value, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(map);
      });
  }
}
