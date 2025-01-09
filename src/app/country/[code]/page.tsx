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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await ApiClient.getCountryInfo(countryCode);
        setCountry(data);
      } catch (err) {
        setError('Failed to load country information');
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading country information...</div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to country list
        </Link>
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