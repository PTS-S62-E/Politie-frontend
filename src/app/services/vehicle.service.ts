import {Injectable} from '@angular/core';
import {Vehicle} from '../classes/Vehicle';
import {Observable} from 'rxjs/Observable';
import moment = require('moment');

@Injectable()
export class VehicleService {

  constructor() {
  }

  public static getMock() {
    return [
      <Vehicle> {
        brand: 'Kit',
        category: 'Superzware raceauto jonge!',
        hardwareSn: '1234-abcd-1234',
        plate: '12-AB-34',
        type: 'F5000',
        stolen: false,
        owners: [
          {
            from: moment().subtract(3, 'years').toDate(),
            to: moment().toDate(),
            owner: {
              address: 'TestStreet 123',
              city: 'TestCity',
              email: 'someone@email.com',
              name: 'Jeff',
              password: 'SuperSecretPassword'
            }
          }
        ]
      },
      <Vehicle> {
        brand: 'Osake',
        category: 'Kleine waggie!',
        hardwareSn: '2345-bcde-2345',
        plate: '34-ZX-69',
        type: 'FI2',
        stolen: true,
        owners: [
          {
            from: moment().subtract(1, 'years').toDate(),
            to: moment().toDate(),
            owner: {
              address: 'TestStreet 123',
              city: 'TestCity',
              email: 'someone@email.com',
              name: 'Jeff',
              password: 'SuperSecretPassword'
            }
          }
        ]
      },
      <Vehicle> {
        brand: 'Suzuki',
        category: 'Normale waggie!',
        hardwareSn: '5678-abcd,5678',
        plate: '69-AB-420',
        type: 'S23',
        stolen: false,
        owners: [
          {
            from: moment().subtract(1, 'years').toDate(),
            to: moment().subtract(4, 'days').toDate(),
            owner: {
              address: 'TestStreet 123',
              city: 'TestCity',
              email: 'someone@email.com',
              name: 'Jeff',
              password: 'SuperSecretPassword'
            }
          },
          {
            from: moment().subtract(3, 'days').toDate(),
            to: moment().toDate(),
            owner: {
              address: 'AnotherStreet 123',
              city: 'AnotherCity',
              email: 'someoneelse@email.com',
              name: 'Deur',
              password: 'Password'
            }
          }
        ]
      }
    ];
  }

  public getVehicles(): Observable<Vehicle[]> {
    return new Observable((observer) => {
      observer.next(VehicleService.getMock());
      observer.complete();
    });
  }
}
