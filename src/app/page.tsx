'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ApiClient } from '@/lib/api-client';
import type { BaseCountry } from '@/types';

export default function CountryList() {
  const [countries, setCountries] = useState<BaseCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await ApiClient.getAvailableCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
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
              {country.flagUrl && (
                <div className="relative w-12 h-8 overflow-hidden rounded">
                  <Image
                    src={country.flagUrl}
                    alt={`Flag of ${country.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
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