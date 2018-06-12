import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrackingService {

  private backendLocation = environment.baseUrl + '/vehicles/track';

  constructor(private httpClient: HttpClient) { }

  start(licensePlate: string): Observable<any> {
    return this.httpClient.post(this.backendLocation, licensePlate,
      {
        headers: {
          'content_type': 'text/plain'
        }
      });
  }

  stop(licensePlate: string): Observable<any> {
    const deleteUrl = this.backendLocation + '/' + licensePlate;

    return this.httpClient.delete(deleteUrl);
  }

}
