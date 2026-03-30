# Prevoznik.ba

A full-stack platform connecting shippers with carriers across Bosnia and Herzegovina.
Users can post shipments, carriers receive notifications and place bids — similar to an auction model where the client selects the best offer.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Hono
- **ORM:** Prisma
- **Database:** Neon (serverless PostgreSQL)
- **Auth:** NextAuth.js v5
- **Hosting:** Vercel

## Features

- User registration as shipper or carrier
- JWT-based authentication
- Role-based dashboards
- Shipment posting and bid system
- Real-time chat between shipper and carrier (coming soon)
- Stripe payments (coming soon)
- Carrier ratings and reviews (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- Neon account

### Installation

1. Clone the repository
```bash
   git clone https://github.com/bujakasha21/prevoznik.ba.git
   cd prevoznik.ba
```

2. Install dependencies
```bash
   npm install
```

3. Set up environment variables — create a `.env` file:
```env
   DATABASE_URL="your-neon-connection-string"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations
```bash
   npx prisma migrate dev
```

5. Start the development server
```bash
   npm run dev
```

## Roadmap

- [x] Authentication (login, signup, JWT)
- [x] Role-based access control
- [x] Database schema
- [ ] Shipment posting
- [ ] Bid/auction system
- [ ] Real-time chat
- [ ] Carrier ratings
- [ ] Stripe payments
- [ ] Google OAuth
- [ ] Mobile optimization

## License

MIT
