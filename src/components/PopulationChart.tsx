'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { PopulationData } from '@/types';

interface PopulationChartProps {
  data: PopulationData[];
}

export function PopulationChart({ data }: PopulationChartProps) {
  const formatPopulation = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const hasValidData = () => {
    if (!data || data.length === 0) {
      return false;
    }

    const hasNonZeroPopulation = data.some(
      (entry) => entry.value !== 0 && entry.value != null
    );

    return hasNonZeroPopulation;
  };

  if (!hasValidData()) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.782 2.782L8.5 8.5M12 10v4l2.5 2.5"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Population Data Unavailable
          </h3>
          <p className="text-gray-500 mb-4">
            We could not retrieve population information for this country.
          </p>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Possible reasons:</p>
            <ul className="list-disc list-inside">
              <li>Data source temporarily unavailable</li>
              <li>Incomplete historical records</li>
              <li>Technical issues with data retrieval</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const validData = data.filter(entry => entry.value != null && entry.value > 0);

  if (validData.length < 2) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-yellow-50 rounded-lg p-6">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-yellow-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">
            Limited Population Data
          </h3>
          <p className="text-yellow-600 mb-4">
            Not enough data points to create a meaningful trend.
          </p>
          <div className="text-sm text-yellow-700">
            <p>Current data points: {validData.length}</p>
            <p>Recommend: Seek additional historical population records</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-sm">
      <ResponsiveContainer>
        <LineChart
          data={validData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="year"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toString()}
            label={{
              value: 'Year',
              position: 'insideBottomRight',
              offset: -10
            }}
          />
          <YAxis
            tickFormatter={formatPopulation}
            label={{
              value: 'Population',
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <Tooltip
            formatter={(value: number) => [formatPopulation(value), 'Population']}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {validData.length < data.length && (
        <div className="text-xs text-gray-500 text-center mt-2">
          * Some data points were excluded due to invalid values
        </div>
      )}
    </div>
  );
}