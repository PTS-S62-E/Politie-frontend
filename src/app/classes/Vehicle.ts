import {Ownership} from './Ownership';

export interface Vehicle {
  plate: String;
  brand: String;
  type: String;
  hardwareSn: String;
  owners: Ownership[];
  category: String;
}
