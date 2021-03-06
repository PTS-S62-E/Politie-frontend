import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';

@Injectable()
export class VehicleService {

  private backendLocation = environment.baseUrl + '/vehicles/stolen/';

  private _vehicles = new BehaviorSubject([]);
  public vehicles = this._vehicles.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public getVehicles() {
    return this.httpClient.get(this.backendLocation).subscribe(data => {
      const vehicles = data as EuropolVehicle[];
      console.log(vehicles);
      this._vehicles.next(vehicles);
    });
  }

  public searchForStolenVehicle(id: string) {
    return this.httpClient.get(`${this.backendLocation}${id}`);
  }

  public addStolenVehicle(licensePlate: string) {
    return this.httpClient
      .post(
        this.backendLocation,
        <EuropolVehicle> {
          originCountry: 'FI',
          licensePlate: licensePlate
        })
      .subscribe(newVeh => {
        const v = this._vehicles.getValue();
        v.push(newVeh);
        this._vehicles.next(v);
      });
  }

  public removeStolenVehicle(serialNumber: string) {
    return this.httpClient.delete(`${this.backendLocation}${serialNumber}`)
      .subscribe(_ => {
        const vehicles = this._vehicles.getValue() as EuropolVehicle[];
        const newVal = vehicles.filter(d => d.serialNumber !== serialNumber);
        this._vehicles.next(newVal);
      });
  }
}
