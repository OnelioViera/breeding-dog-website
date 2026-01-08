# How to View Detailed Error Messages in Vercel Logs

## You're Seeing 500 Errors - Here's How to See Why

The logs show `GET 500 /api/puppies` which means the API is failing. To see the actual error:

### Step 1: Click on the Error Entry

1. In the Runtime Logs, find the red `500` error entries
2. **Click directly on the error line** (the one that says `GET 500 /api/puppies`)
3. This should expand to show detailed error information

### Step 2: Look for These Details

When you expand the error, you should see:
- The full error message
- Stack trace
- Console logs (including our debugging output)

Look specifically for:
```
=== Payload Initialization ===
DATABASE_URI: Set or MISSING
PAYLOAD_SECRET: Set or MISSING
```

And any MongoDB connection errors like:
- `MongoServerError`
- `MongoNetworkError`
- `Authentication failed`
- `Connection timeout`

### Step 3: Alternative - Check Function Logs

If clicking doesn't expand the error:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Look for **Functions** section
4. Click on `/api/puppies` or `/api/index.ts`
5. This shows detailed execution logs

### Step 4: Trigger a New Request

To see fresh logs with our debugging output:

1. Visit: `https://breeding-dog-website.vercel.app/api/puppies`
2. Go back to Runtime Logs
3. Click on the newest `500` error
4. You should see the detailed initialization logs

## What to Share

Once you can see the detailed error, look for:
- The `=== Payload Initialization ===` section
- Any MongoDB connection errors
- Whether `DATABASE_URI` shows as "Set" or "MISSING"

Share those details and I can help fix the specific issue!

