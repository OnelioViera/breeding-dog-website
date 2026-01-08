
  # Dog Breeders Website

  This is a code bundle for Dog Breeders Website. The original project is available at https://www.figma.com/design/w7hhGVppfUk52V9D4p3fQY/Dog-Breeders-Website.

  ## Tech Stack

  - **Frontend**: React + Vite + TypeScript + Tailwind CSS
  - **Backend**: Payload CMS (Headless CMS)
  - **Database**: MongoDB

  ## Quick Start

  ### 1. Install Dependencies

  ```bash
  npm install
  ```

  ### 2. Set Up Environment Variables

  Copy `.env.example` to `.env` and configure:

  ```bash
  cp .env.example .env
  ```

  Edit `.env` and set:
  - `PAYLOAD_SECRET` - A secure random string
  - `DATABASE_URI` - MongoDB connection string (default: `mongodb://localhost:27017/dog-breeding-website`)

  ### 3. Start MongoDB

  Make sure MongoDB is running. Options:
  - Local installation
  - Docker: `docker run -d -p 27017:27017 --name mongodb mongo`
  - MongoDB Atlas (cloud)

  ### 4. Start Development Servers

  **Terminal 1 - Payload CMS (Backend):**
  ```bash
  npm run dev:payload
  ```
  Access admin panel at: http://localhost:3001/admin

  **Terminal 2 - Vite Frontend:**
  ```bash
  npm run dev
  ```
  View website at: http://localhost:3000

  ## Available Scripts

  - `npm run dev` - Start Vite development server (frontend)
  - `npm run dev:payload` - Start Payload CMS server (backend)
  - `npm run build` - Build frontend for production
  - `npm run payload` - Run Payload CLI commands
  - `npm run payload:generate:types` - Generate TypeScript types from Payload collections

  ## Payload CMS Setup

  For detailed Payload CMS setup instructions, see [PAYLOAD_SETUP.md](./PAYLOAD_SETUP.md)

  ## Project Structure

  ```
  /
  ├── src/
  │   ├── app/              # React components
  │   │   └── components/   # Page components
  │   ├── collections/      # Payload CMS collections
  │   └── lib/              # Utilities (API functions)
  ├── payload.config.ts     # Payload CMS configuration
  ├── server.ts             # Payload server entry point
  └── vite.config.ts        # Vite configuration
  ```

  ## Collections

  - **Puppies**: Manage available puppies
  - **Gallery**: Manage gallery images
  - **Contacts**: View contact form submissions
  - **Media**: Upload and manage images/files
  