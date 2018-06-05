import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VehicleinfoService {

  private backendLocation = environment.baseUrl + '/vehicles/info/';

  constructor(private httpClient: HttpClient) {

  }

  public getVehicleInfo(licensePlate: string): Observable<BackendVehicleInfo> {
    return this.httpClient
      .get(`${this.backendLocation}${licensePlate}`) as Observable<BackendVehicleInfo>;
  }
}
