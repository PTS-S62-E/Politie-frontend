import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { TranslocationDto } from '../classes/TranslocationDto';

@Injectable()
export class TranslocationService {

  private _translocations = new BehaviorSubject([]);
  public $translocations = this._translocations.asObservable();

  private backendLocation = environment.baseUrl + '/vehicles/info/';

  constructor(private httpClient: HttpClient) { }

  public getTranslocations(licensePlate: String, startDate: String, endDate: String) {
    var fullUrl = `${this.backendLocation}${licensePlate}/${startDate}/${endDate}`
    console.log(fullUrl);

    return this.httpClient.get(fullUrl).subscribe(data => {
      const translocations = data as TranslocationDto[];
      console.log(translocations);
      this._translocations.next(translocations);
    });
  }
}
