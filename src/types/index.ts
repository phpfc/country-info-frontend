export interface BaseCountry {
  countryCode: string;
  name: string;
  flagUrl: string;
}

export interface BorderCountry {
  countryCode: string;
  name: string;
  flagUrl: string;
}

export interface CountryInfo extends BaseCountry {
  borders: BorderCountry[];
  population: PopulationData[];
  flagUrl: string;
}

export interface PopulationData {
  year: number;
  value: number;
}