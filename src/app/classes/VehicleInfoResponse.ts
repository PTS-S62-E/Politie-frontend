import {Ownership} from './Ownership';

export interface VehicleInfoResponse {
  ownership: Ownership[];
  vehicleDto: any;
  tariffCategory: TariffCategory;
}
