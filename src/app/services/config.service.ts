import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {
  }

  public getAdministrationEndpoint() {
    return 'http://localhost:8080/rekening-administratie';
  }

}
