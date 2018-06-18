import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MapInput} from '../../classes/MapInput';
import {Subscription} from 'rxjs/Subscription';
import { Message } from '@stomp/stompjs';
import {Observable} from 'rxjs/Observable';
import {StompService} from '@stomp/ng2-stompjs';
import {environment} from '../../../environments/environment';
import {TrackingDto} from '../../classes/TrackingDto';
import {TranslocationDto} from '../../classes/TranslocationDto';
import {ActivatedRoute} from '@angular/router';
import {TrackingService} from '../../services/tracking.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private lastReceivedTranslocationDto: TranslocationDto = undefined;
  private map: L.Map;

  private licensePlate = '';
  private isTracking = false;

  /**
   * RabbitMQ vars
   */
  private trackingSubscription: Subscription;
  private trackingReceivedMessage: Observable<Message>;
  public isSubscribedToTrackingQueue: boolean;

  @Input()
  public mapInput: MapInput;

  constructor(private _stompService: StompService, private route: ActivatedRoute, private trackingService: TrackingService) {
    this.route.params.subscribe(params => {
      this.licensePlate = params['licenseplate'];
    });
  }

  ngOnInit() {
    this.isSubscribedToTrackingQueue = false;

    this.map = L.map('leafletmap').setView([64.704413, 26.851953], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(this.map);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    if (this.isSubscribedToTrackingQueue) {
      return;
    }

    this.trackingReceivedMessage = this._stompService.subscribe(environment.trackingQueueChannel);
    this.trackingSubscription = this.trackingReceivedMessage.subscribe(this.onTrackingMessage);
    this.isSubscribedToTrackingQueue = true;

    console.log('Subscribed to RabbitMQ');
  }

  unsubscribe() {
    if (!this.isSubscribedToTrackingQueue) {
      return;
    }

    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.trackingSubscription.unsubscribe();
    this.trackingSubscription = null;
    this.trackingReceivedMessage = null;

    this.isSubscribedToTrackingQueue = false;

    console.log('Unsubscribed from RabbitMQ');
  }

  onTrackingMessage = (message: Message) => {
    console.log('Message recieved!');
    console.log(message.body);
    const trackingDto: TrackingDto = JSON.parse(message.body);
    const translocationDto: TranslocationDto = trackingDto.translocationDto;

    this.drawUpdate(translocationDto);
  }

  public drawUpdate(location: TranslocationDto) {
    if (this.lastReceivedTranslocationDto === undefined) {
      L.circle([location.latitude, location.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
          }).addTo(this.map);

      this.lastReceivedTranslocationDto = location;
    } else {
      // Draw a circle to show where the new location is
      L.circle([location.latitude, location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
      }).addTo(this.map);

      // Draw a line between the last and new location
      L.polyline([[this.lastReceivedTranslocationDto.latitude, this.lastReceivedTranslocationDto.longitude], [location.latitude, location.longitude]], {
        color: 'red'
      }).addTo(this.map);

      this.lastReceivedTranslocationDto = location;
    }
  }

  public startTracking() {
    this.trackingService.start(this.licensePlate).subscribe(res => {
      console.log('OK');
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.subscribe();
    this.isTracking = true;
  }

  public stopTracking() {
    this.trackingService.stop(this.licensePlate).subscribe(res => {
      console.log('DELETE OK');
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.unsubscribe();
    this.isTracking = false;
  }
}
