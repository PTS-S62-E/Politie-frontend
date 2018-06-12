import { Component, OnInit } from '@angular/core';
import { TranslocationService } from '../services/translocation.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslocationDto } from '../classes/TranslocationDto';
import * as L from 'leaflet';
import { JourneyDto } from '../classes/JourneyDto';
import { MapInput } from '../classes/MapInput';
import { AdministrationDto } from '../classes/AdministrationDto';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.component.html',
  styleUrls: ['./history-map.component.css']
})
export class HistoryMapComponent implements OnInit {

  public warning: String;
  public licensePlate: String;
  public startDate: String;
  public endDate: String;
  public administrationDto: AdministrationDto;
  private map: L.Map;
  private mapInput: MapInput;

  constructor(private translocationService: TranslocationService) {
  }

  public getHistory() {

    this.warning = '';

    if (this.compareDates(this.convertToDate(this.startDate),
      this.convertToDate(this.startDate))) {

      this.translocationService.getTranslocations(this.licensePlate, this.createValidDate(this.startDate), this.createValidDate(this.endDate))
        .subscribe(result => {
          this.administrationDto = result;
          this.drawHistory(result);
          this.setViewToLastTranslocation(result);
        });
    }
    else {
      this.warning = 'end date should be bigger than start date.'
    }
  }

  private setViewToLastTranslocation(administrationDto: AdministrationDto) {
    let jsize = administrationDto.journeys.length;
    let tsize = administrationDto.journeys[jsize - 1].translocations.length;

    this.map.setView([this.administrationDto.journeys[jsize - 1].translocations[tsize - 1].latitude,
    this.administrationDto.journeys[jsize - 1].translocations[tsize - 1].longitude], 13);
  }

  private compareDates(start: Date, end: Date): Boolean {
    if (end < start) {
      return false;
    }
    return true;
  }

  private convertToDate(date: String): Date {
    return new Date("13-01-2011".replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  }

  private createValidDate(date: String): String {
    var validDate = date + 'T00:00:00.000Z';
    validDate = validDate.replace(/ /g, "%20");
    validDate = validDate.replace(/:/g, "%3A");
    return validDate;
  }

  private drawHistory(administrationDto: AdministrationDto) {

    for (let journey of administrationDto.journeys) {
      console.log('next journey');
      let color = this.getRandomColor();
      let previousTranslocation = undefined;
      console.log(color);
      for (let translocation of journey.translocations) {
        this.draw(translocation, previousTranslocation, color);
        previousTranslocation = translocation;
      }
    }
  }

  private getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private draw(location: TranslocationDto, previousTranslocation: TranslocationDto, color: string) {

    if (previousTranslocation !== undefined) {
      console.log(previousTranslocation.id + "-" + location.id)
    }

    L.circle([location.latitude, location.longitude], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: 10
    }).bindPopup(this.getData(location)).addTo(this.map);

    if (previousTranslocation !== undefined) {
      // Draw a line between the last and new location
      L.polyline([[previousTranslocation.latitude, previousTranslocation.longitude], [location.latitude, location.longitude]], {
        color: color
      }).bindPopup(this.getData(location)).addTo(this.map);
    }

  }

  private getData(translocationDto: TranslocationDto): string {
    return `Vehicle data:
    translocationId: ${translocationDto.id}
    serialnumber: ${translocationDto.serialNumber}
    lat: ${translocationDto.latitude}
    long: ${translocationDto.longitude}
    timestamp: ${translocationDto.timestamp}`;
  }

  private initMap() {

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

    this.map = L.map('leafletmap').setView([this.mapInput.center.lat, this.mapInput.center.lng], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(this.map);
  }

  ngOnInit() {
    this.initMap();
  }

}
