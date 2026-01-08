# Dog Breeding Website

A modern, responsive website for a dog breeding business built with React, Vite, and Payload CMS.

## Features

- 🐾 Beautiful, responsive design
- 📱 Mobile-friendly interface
- 🎨 Modern UI with Tailwind CSS
- 📝 Content management with Payload CMS
- 🖼️ Image gallery
- 📧 Contact form
- 🐕 Puppy listings with inquiry modals
- 📄 Dynamic page creation
- 🔗 Customizable navbar dropdown

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Payload CMS 2.x
- **Database**: MongoDB
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OnelioViera/breeding-dog-website.git
cd breeding-dog-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp vercel.env.example .env
```

4. Configure environment variables in `.env`:
```
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=mongodb://localhost:27017/dog-breeding-website
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
VITE_PAYLOAD_API_URL=http://localhost:3001/api
```

5. Start MongoDB (if using local):
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

6. Start Payload CMS server:
```bash
npm run dev:payload
```

7. In another terminal, start the frontend:
```bash
npm run dev
```

8. Access the site:
- Frontend: http://localhost:3000
- Payload Admin: http://localhost:3001/admin

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed Vercel deployment instructions.

## Project Structure

```
├── api/                 # Vercel serverless functions
├── src/
│   ├── app/            # React application
│   │   ├── components/  # React components
│   │   └── App.tsx    # Main app component
│   ├── collections/    # Payload CMS collections
│   ├── lib/            # Utility functions
│   └── styles/         # CSS files
├── server.ts           # Payload server (development)
├── payload.config.ts   # Payload configuration
└── vercel.json         # Vercel configuration
```

## Collections

- **Puppies**: Manage available puppies
- **Gallery**: Image gallery management
- **Pages**: Dynamic page creation
- **Contacts**: Contact form submissions
- **Media**: File uploads
- **Users**: Admin users

## License

Private project
