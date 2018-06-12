import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { JourneyDto } from '../classes/JourneyDto';
import { AdministrationDto } from '../classes/AdministrationDto';

@Injectable()
export class TranslocationService {

  private backendLocation = environment.baseUrl + '/vehicles/info/';

  constructor(private httpClient: HttpClient) { }

  public getTranslocations(licensePlate: String, startDate: String, endDate: String) {
    var fullUrl = `${this.backendLocation}${licensePlate}/${startDate}/${endDate}`
    console.log(fullUrl);
    return this.httpClient.get<AdministrationDto>(fullUrl);
  }
}
