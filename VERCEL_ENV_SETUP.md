# Vercel Environment Variables Setup

## Your MongoDB Connection String

Use this exact connection string in Vercel (with your actual password, not the x's):

```
mongodb+srv://ojvwebdesign_db_user:YOUR_ACTUAL_PASSWORD@cluster0.xom7zf6.mongodb.net/dog-breeding-website?retryWrites=true&w=majority
```

**Important:** Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB password (the one you use locally).

## Step-by-Step: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `breeding-dog-website` (or whatever you named it)

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add Each Environment Variable**

   Add these one by one:

   ### DATABASE_URI
   - **Key:** `DATABASE_URI`
   - **Value:** `mongodb+srv://ojvwebdesign_db_user:YOUR_ACTUAL_PASSWORD@cluster0.xom7zf6.mongodb.net/dog-breeding-website?retryWrites=true&w=majority`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

   ### PAYLOAD_SECRET
   - **Key:** `PAYLOAD_SECRET`
   - **Value:** `343eb5f48f729c5f31b73137b6131c3f7016f327be399db2048df04e96639e47` (from your local .env)
   - **Environment:** Select all
   - Click **Save**

   ### PAYLOAD_PUBLIC_SERVER_URL
   - **Key:** `PAYLOAD_PUBLIC_SERVER_URL`
   - **Value:** `https://your-project-name.vercel.app` (replace with your actual Vercel URL)
   - **Environment:** Select all
   - Click **Save**

   ### VITE_PAYLOAD_API_URL
   - **Key:** `VITE_PAYLOAD_API_URL`
   - **Value:** `https://your-project-name.vercel.app/api` (same URL as above + `/api`)
   - **Environment:** Select all
   - Click **Save**

   ### FRONTEND_URL
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://your-project-name.vercel.app` (same as PAYLOAD_PUBLIC_SERVER_URL)
   - **Environment:** Select all
   - Click **Save**

4. **Redeploy**
   - After adding all environment variables, go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger automatic deployment

## How to Find Your Vercel URL

1. Go to your project in Vercel Dashboard
2. Look at the **Domains** section in Settings
3. Your URL will be something like: `breeding-dog-website.vercel.app` or a custom domain

## Verify MongoDB Atlas Network Access

Before redeploying, make sure MongoDB Atlas allows Vercel to connect:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Click **Network Access** in the left sidebar
4. Click **Add IP Address**
5. Click **Allow Access from Anywhere** (adds `0.0.0.0/0`)
   - Or add specific Vercel IP ranges if you prefer
6. Click **Confirm**

## After Redeployment

1. Visit your site: `https://your-project.vercel.app`
2. Check if your puppies, gallery images, and pages are showing
3. Visit admin panel: `https://your-project.vercel.app/admin`
4. Log in with your Payload admin credentials
5. Verify all your data is there

## Troubleshooting

If data still doesn't show:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions tab
   - Click on a function execution
   - Look for database connection errors

2. **Verify Environment Variables:**
   - Make sure `DATABASE_URI` has your actual password (not x's)
   - Check that all variables are set for the correct environment (Production)

3. **Test MongoDB Connection:**
   - Try connecting to your MongoDB Atlas from a different location
   - Verify the connection string works locally

4. **Check Database Name:**
   - Ensure the database name in the connection string is exactly: `dog-breeding-website`
   - MongoDB is case-sensitive

