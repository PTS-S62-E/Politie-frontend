export interface ITranslocation {
  lat: number;
  lng: number;
}

export class Translocation implements ITranslocation {
  public lat: number;
  public lng: number;
}
