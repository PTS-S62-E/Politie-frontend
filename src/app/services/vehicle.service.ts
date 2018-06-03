import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class VehicleService {

  private backendLocation = 'http://localhost:8080/Backend-Politie/api/vehicles/stolen/';

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

  public addStolenVehicle(id: string) {
    return this.httpClient
      .post(
        this.backendLocation,
        {
          id: id,
          country: 'FI'
        })
      .subscribe(newVeh => {
        const v = this._vehicles.getValue();
        v.push(newVeh);
        this._vehicles.next(v);
      });
  }

  public removeStolenVehicle(id: string) {
    return this.httpClient.delete(`${this.backendLocation}${id}`)
      .subscribe(_ => {
        const vehicles = this._vehicles.getValue() as EuropolVehicle[];
        const newVal = vehicles.filter(d => d.id !== id);
        this._vehicles.next(newVal);
      });
  }
}
