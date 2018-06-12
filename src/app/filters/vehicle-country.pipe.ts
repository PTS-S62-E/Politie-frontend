import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vehicleCountry',
  pure: false
})
export class VehicleCountryPipe implements PipeTransform {
  transform(items: EuropolVehicle[], countries: string[] = ['FI']): any {
    if (!items || !countries) {
      console.error('Items or countries is false');
      return items;
    }
    items = items.filter(item => item.licensePlate !== '');

    countries.forEach(countryFilter => {
      // Inverse filter, exclude results
      if (countryFilter.startsWith('!')) {
        countryFilter = countryFilter.slice(1);
        items = items.filter(item => countryFilter.indexOf(item.originCountry) === -1);
      } else {
        // Filters based on country code
        items = items.filter(item => countryFilter.indexOf(item.originCountry) !== -1);
      }
    });
    return items;
  }
}
