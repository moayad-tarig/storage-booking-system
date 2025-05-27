# Storage Booking System - Frontend

A modern web application for managing storage unit bookings, built with Next.js and Tailwind CSS.

## Features

- 🏢 Browse available storage units
- 🔍 Filter units by size and availability
- 📅 Book storage units with date selection
- 👤 View and manage your bookings
- 🎨 Modern and responsive UI
- 🔔 Toast notifications for user feedback

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **State Management**: React Hooks
- **API Integration**: Custom API service
- **Notifications**: react-hot-toast

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Backend server running (see backend README for setup)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd storage-booking-system/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── book/           # Booking page
│   │   ├── bookings/       # Bookings management
│   │   └── storage-units/  # Units listing
│   ├── components/         # Reusable components
│   ├── services/          # API services
│   └── styles/            # Global styles
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The frontend communicates with the backend API through the `api.js` service. The API endpoints include:

- `GET /units` - Fetch all storage units
- `GET /bookings` - Fetch user bookings
- `POST /bookings` - Create a new booking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
