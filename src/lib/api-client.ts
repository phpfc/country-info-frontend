import { CountryInfo, BaseCountry } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiClient {
  private static async fetchApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      const errorBody = await response.text();
      throw {
        status: response.status,
        message: errorBody || `API call failed: ${response.statusText}`,
        endpoint
      };
    }

    return response.json();
  }

  static async getAvailableCountries(): Promise<BaseCountry[]> {
    return this.fetchApi<BaseCountry[]>('/countries');
  }

  static async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    return this.fetchApi<CountryInfo>(`/countries/${countryCode}`);
  }
}