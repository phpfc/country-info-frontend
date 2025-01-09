'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ApiClient } from '@/lib/api-client';
import type { BaseCountry } from '@/types';

export default function CountryList() {
  const [countries, setCountries] = useState<BaseCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    isNetworkError: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await ApiClient.getAvailableCountries();
        if (data.length === 0) {
          setError({
            message: 'No countries found. Please try again later.',
            isNetworkError: false
          });
        } else {
          setCountries(data);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error
          ? err.message
          : 'Failed to load countries';

        setError({
          message: errorMessage,
          isNetworkError: true
        });
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading countries...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error.isNetworkError ? 'Network Error' : 'No Data Available'}
          </h2>
          <p className="text-gray-700 mb-6">{error.message}</p>
          {error.isNetworkError && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                This could be due to:
                - Internet connection issue
                - Service temporarily unavailable
                - API endpoint down
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Try Reloading
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <Link
            key={country.countryCode}
            href={`/country/${country.countryCode}`}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              {country.flagUrl ? (
                <div className="relative w-12 h-8 overflow-hidden rounded">
                  <Image
                    src={country.flagUrl}
                    alt={`Flag of ${country.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                  No Flag
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-white">{country.name}</h2>
                <p className="text-gray-400 text-sm">{country.countryCode}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}