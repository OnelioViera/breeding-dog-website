# How to Check Vercel Function Logs

## Method 1: Runtime Logs Button (Easiest)

1. On the **Overview** page, find the **Production Deployment** section
2. Look for three buttons: **Build Logs**, **Runtime Logs**, and **Instant Rollback**
3. Click **Runtime Logs**
4. This will show you all the console output from your serverless functions

## Method 2: Logs Tab

1. Click the **Logs** tab in the top navigation bar
2. You'll see a list of log entries
3. Filter by:
   - **Function** (e.g., `/api/puppies`)
   - **Deployment**
   - **Time range**

## Method 3: Through Deployments

1. Click the **Deployments** tab
2. Click on the latest deployment
3. Look for **Runtime Logs** or **Functions** section
4. Click to view detailed logs

## What to Look For

After clicking Runtime Logs, you should see output like:

```
=== Payload Initialization ===
DATABASE_URI: Set (mongodb+srv://...) or MISSING
PAYLOAD_SECRET: Set or MISSING
PAYLOAD_PUBLIC_SERVER_URL: https://your-project.vercel.app
```

## Trigger Logs to Appear

If you don't see logs immediately:

1. Visit your API endpoint: `https://your-project.vercel.app/api/puppies`
2. Or visit your admin panel: `https://your-project.vercel.app/admin`
3. Then check the Runtime Logs again - new entries should appear

## Common Issues in Logs

- `DATABASE_URI: MISSING` → Environment variable not set in Vercel
- `MongoDB connection error` → Network access or connection string issue
- `Authentication failed` → Wrong username/password in connection string

