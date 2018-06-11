export interface ITranslocation {
  lat: number;
  lng: number;
}

export class Translocation implements ITranslocation {
  private _id?: number;

  // These values should always be present in a translocation
  private _lat: number;
  private _lng: number;

  private _serialNumber?: string;
  private _latitude?: number;
  private _longitude?: number;
  private _timeStamp?: string;
  private _countryCode?: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = value;
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  set serialNumber(value: string) {
    this._serialNumber = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get timeStamp(): string {
    return this._timeStamp;
  }

  set timeStamp(value: string) {
    this._timeStamp = value;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }
}
