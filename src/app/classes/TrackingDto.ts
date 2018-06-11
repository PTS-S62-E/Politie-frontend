import {TranslocationDto} from './TranslocationDto';

export class TrackingDto {
  private _licensePlate: string;
  private _translocation: TranslocationDto;
  private _translocationDto: TranslocationDto;

  get licensePlate(): string {
    return this._licensePlate;
  }

  set licensePlate(value: string) {
    this._licensePlate = value;
  }

  get translocation(): TranslocationDto {
    return this._translocation;
  }

  set translocation(value: TranslocationDto) {
    this._translocation = value;
  }

  get translocationDto(): TranslocationDto {
    return this._translocationDto;
  }

  set translocationDto(value: TranslocationDto) {
    this._translocationDto = value;
  }
}
