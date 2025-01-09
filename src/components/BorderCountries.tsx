import Link from 'next/link';
import Image from 'next/image';
import { BorderCountry } from '@/types';

interface BorderCountriesProps {
  borders: BorderCountry[];
}

export function BorderCountries({ borders }: BorderCountriesProps) {
  if (!borders?.length) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Border Countries</h2>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 mb-2">No bordering countries found.</p>
          <p className="text-xs text-gray-500">
            This could be due to incomplete data or geographic isolation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {borders.map((country) => (
          <Link
            key={`border-${country.countryCode}`}
            href={`/country/${country.countryCode}`}
            className="flex flex-col items-center p-4 bg-white border rounded-lg hover:bg-gray-50 transition-all hover:shadow-md"
          >
            {country.flagUrl ? (
              <div className="relative w-full aspect-[3/2] mb-2 overflow-hidden rounded shadow">
                <Image
                  src={country.flagUrl}
                  alt={`Flag of ${country.name}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/2] mb-2 bg-gray-200 rounded shadow flex items-center justify-center text-sm text-gray-600">
                Flag Unavailable
              </div>
            )}
            <span className="text-sm font-medium text-center">{country.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}