'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { PopulationChart } from '@/components/PopulationChart';
import type { CountryInfo } from '@/types';

export default function CountryPage() {
  const params = useParams();
  const countryCode = params.code as string;

  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    isNetworkError: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await ApiClient.getCountryInfo(countryCode);

        if (!data) {
          setError({
            message: `No information found for country code ${countryCode}`,
            isNetworkError: false
          });
        } else {
          setCountry(data);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error
          ? err.message
          : 'Failed to load country information';

        setError({
          message: errorMessage,
          isNetworkError: true
        });
        console.error('Error fetching country:', err);
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountry();
    }
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading country information...
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error?.isNetworkError ? 'Network Error' : 'Country Not Found'}
          </h2>
          <p className="text-gray-700 mb-6">{error?.message}</p>
          {error?.isNetworkError && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                This could be due to:
                - Internet connection issue
                - Service temporarily unavailable
                - Invalid country code
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Try Reloading
              </button>
            </div>
          )}
          <Link href="/" className="text-blue-500 hover:underline inline-block mt-4">
            Return to country list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← Back to country list
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-16 h-12 overflow-hidden rounded">
          {country.flagUrl && (
            <Image
              src={country.flagUrl}
              alt={`Flag of ${country.name}`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <h1 className="text-4xl font-bold">{country.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Population Over Time</h2>
          <PopulationChart data={country.population} />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Border Countries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {country.borders.map((border) => (
              <Link
                key={`border-${border.countryCode}`}
                href={`/country/${border.countryCode}`}
                className="group"
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow bg-white">
                  {border.flagUrl && (
                    <Image
                      src={border.flagUrl}
                      alt={`Flag of ${border.name}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                </div>
                <p className="mt-2 text-sm font-medium text-center text-gray-900">{border.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}