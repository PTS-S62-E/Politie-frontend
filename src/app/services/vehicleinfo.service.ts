import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {VehicleInfoResponse} from '../classes/VehicleInfoResponse';

@Injectable()
export class VehicleinfoService {

  private backendInfoLocation = environment.baseUrl + '/vehicles/info/';
  private backendOwnershipLocation = environment.baseUrl + '/vehicles/ownership/';

  constructor(private httpClient: HttpClient) {

  }

  public getVehicleInfo(licensePlate: string): Observable<BackendVehicleInfo> {
    return this.httpClient
      .get(`${this.backendInfoLocation}${licensePlate}`) as Observable<BackendVehicleInfo>;
  }

  public getVehicleOwnership(licensePlate: string): Observable<VehicleInfoResponse> {
    return this.httpClient.get(`${this.backendOwnershipLocation}${licensePlate}`) as Observable<VehicleInfoResponse>;
  }
}
