# Vercel Deployment Guide

This guide will help you deploy your Dog Breeding Website to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code pushed to GitHub (already done ✅)
3. MongoDB Atlas account (for production database)

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `OnelioViera/breeding-dog-website`
4. Vercel will auto-detect it as a Vite project

### 2. Configure Build Settings

Vercel should auto-detect these settings, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In Vercel project settings, add these environment variables:

#### Required Variables:
```
PAYLOAD_SECRET=your-secret-key-here (generate a secure random string)
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/dog-breeding-website
PAYLOAD_PUBLIC_SERVER_URL=https://your-project.vercel.app
VITE_PAYLOAD_API_URL=https://your-project.vercel.app/api
FRONTEND_URL=https://your-project.vercel.app
```

#### How to get these values:
- **PAYLOAD_SECRET**: Generate a secure random string (you can use: `openssl rand -base64 32`)
- **DATABASE_URI**: Your MongoDB Atlas connection string
- **PAYLOAD_PUBLIC_SERVER_URL**: Your Vercel deployment URL (e.g., `https://breeding-dog-website.vercel.app`)
- **VITE_PAYLOAD_API_URL**: Same as above but with `/api` (e.g., `https://breeding-dog-website.vercel.app/api`)
- **FRONTEND_URL**: Your Vercel deployment URL

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at the provided URL

### 5. Access Payload Admin

After deployment, access the Payload admin at:
```
https://your-project.vercel.app/admin
```

Create your first admin user and start managing content!

## Important Notes

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist Vercel's IP addresses (or use `0.0.0.0/0` for all IPs)
5. Get your connection string and add it to Vercel environment variables

### Media Files
- Media files uploaded in Payload will be stored in Vercel's file system
- For production, consider using cloud storage (S3, Cloudinary, etc.)
- You may need to configure Payload to use external storage

### Environment Variables
- Never commit `.env` files to git
- All environment variables must be set in Vercel dashboard
- Update `PAYLOAD_PUBLIC_SERVER_URL` and `VITE_PAYLOAD_API_URL` after first deployment

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 20.x by default)
- Check build logs in Vercel dashboard

### API Not Working
- Verify environment variables are set correctly
- Check that `VITE_PAYLOAD_API_URL` matches your Vercel URL
- Ensure MongoDB connection string is correct

### CORS Errors
- Verify `FRONTEND_URL` matches your Vercel deployment URL
- Check CORS settings in `api/index.ts`

## Updating Your Deployment

After making changes:
1. Commit and push to GitHub
2. Vercel will automatically redeploy
3. Or manually trigger a deployment from Vercel dashboard

