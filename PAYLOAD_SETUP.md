# Payload CMS Setup Guide

This project uses Payload CMS as a backend API to manage content for the dog breeding website.

## Prerequisites

1. **MongoDB** - Payload requires MongoDB. You can either:
   - Install MongoDB locally: https://www.mongodb.com/try/download/community
   - Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

## Setup Steps

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and update:
- `PAYLOAD_SECRET` - A random secret key for Payload (generate a secure random string)
- `DATABASE_URI` - Your MongoDB connection string
  - Local: `mongodb://localhost:27017/dog-breeding-website`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dog-breeding-website`

### 3. Start MongoDB

**Local MongoDB:**
```bash
# If installed locally, start MongoDB service
sudo systemctl start mongod  # Linux
# or
brew services start mongodb-community  # macOS
```

**Docker:**
```bash
docker start mongodb
```

### 4. Start Payload Server

In one terminal, start the Payload CMS server:

```bash
npm run dev:payload
```

This will start Payload on `http://localhost:3001`

### 5. Start Vite Frontend

In another terminal, start the Vite development server:

```bash
npm run dev
```

This will start the frontend on `http://localhost:3000`

### 6. Access Payload Admin

1. Open `http://localhost:3001/admin` in your browser
2. Create your first admin user
3. Start adding content (Puppies, Gallery images, etc.)

## Collections

### Puppies
- Manage available puppies
- Fields: name, breed, age, gender, price, image, available status, description

### Gallery
- Manage gallery images
- Fields: title, image, description, category

### Contacts
- View contact form submissions
- Fields: name, email, phone, message, status

### Media
- Upload and manage images/files
- Used by Puppies and Gallery collections

## API Endpoints

The frontend connects to Payload via REST API:

- `GET /api/puppies` - Get all puppies
- `GET /api/gallery` - Get gallery images
- `POST /api/contacts` - Submit contact form

## Development Workflow

1. Start MongoDB
2. Start Payload server (`npm run dev:payload`)
3. Start Vite frontend (`npm run dev`)
4. Access admin panel at `http://localhost:3001/admin` to manage content
5. View website at `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `DATABASE_URI` in `.env` is correct
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in `.env` if 3001 is taken
- Update `VITE_PAYLOAD_API_URL` in `.env` to match

### CORS Issues
- Payload should handle CORS automatically
- If issues occur, check Payload config for CORS settings

## Production Deployment

For production:
1. Set secure `PAYLOAD_SECRET`
2. Use production MongoDB (Atlas recommended)
3. Update `PAYLOAD_PUBLIC_SERVER_URL` to your production domain
4. Build frontend: `npm run build`
5. Deploy Payload server and frontend separately or together

