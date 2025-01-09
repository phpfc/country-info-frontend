# Country Info Frontend

## Project Description

A Next.js application that provides an interactive interface for exploring country information. The application displays:
- List of countries with flags
- Detailed country pages
- Population data visualization
- Border countries exploration

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts (for population data visualization)

## Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)

## Installation

1. Clone the repository
```bash
git clone https://github.com/phpfc/country-info-frontend.git
cd country-info-frontend
```

2. Install dependencies
```bash
npm install
```

## Environment Configuration

Create a `.env.local` file in the project root:
```
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run start
```

## Application Features

- Responsive design using Tailwind CSS
- Dynamic routing for country details
- Interactive population data chart
- Border countries navigation
- Loading and error state management

## Project Structure

- `app/`: Next.js app directory
  - `page.tsx`: Countries list page
  - `country/[code]/page.tsx`: Individual country details page
- `components/`: Reusable React components
  - `BorderCountries.tsx`: Border countries display
  - `PopulationChart.tsx`: Population data visualization
- `lib/`: Utility functions and API client
- `types/`: TypeScript type definitions

## API Integration

The frontend consumes a local backend API that aggregates data from:
- Nager.Date API
- Countries Now API

## Styling

- Fully responsive design
- Mobile and desktop friendly
- Consistent color scheme and typography

## Performance Considerations

- Server-side rendering (SSR) for initial page load
- Client-side navigation
- Efficient data fetching and caching
