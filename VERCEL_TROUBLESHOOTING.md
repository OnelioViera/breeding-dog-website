# Vercel Deployment Troubleshooting - MongoDB Not Working

## Common Issues When MongoDB Works Locally But Not on Vercel

### 1. Check Environment Variables in Vercel

**Most Common Issue:** Environment variables not set or set incorrectly.

#### Steps to Verify:

1. **Go to Vercel Dashboard:**
   - Your Project → Settings → Environment Variables

2. **Verify these variables are set:**
   - `DATABASE_URI` - Your MongoDB connection string
   - `PAYLOAD_SECRET` - Your Payload secret
   - `PAYLOAD_PUBLIC_SERVER_URL` - Your Vercel URL
   - `VITE_PAYLOAD_API_URL` - Your Vercel URL + `/api`
   - `FRONTEND_URL` - Your Vercel URL

3. **Check Environment Scope:**
   - Make sure variables are set for **Production** environment
   - You can also set them for Preview and Development

4. **Important:** After adding/changing environment variables:
   - **You MUST redeploy** for changes to take effect
   - Go to Deployments → Click three dots (⋯) → Redeploy

### 2. MongoDB Atlas Network Access

**Critical:** MongoDB Atlas must allow Vercel's IP addresses to connect.

#### Fix Network Access:

1. **Go to MongoDB Atlas:**
   - https://cloud.mongodb.com/
   - Select your cluster
   - Click **Network Access** (left sidebar)

2. **Add IP Address:**
   - Click **Add IP Address**
   - Click **Allow Access from Anywhere** (adds `0.0.0.0/0`)
   - Click **Confirm**
   - Wait 1-2 minutes for changes to propagate

3. **Why this is needed:**
   - Vercel uses dynamic IP addresses
   - Your local IP is already whitelisted
   - Vercel's IPs are different and need to be allowed

### 3. Check Vercel Function Logs

The improved logging will show you exactly what's wrong:

1. **Go to Vercel Dashboard:**
   - Your Project → **Functions** tab
   - Click on a function execution (e.g., `/api/puppies`)

2. **Look for these log messages:**
   ```
   === Payload Initialization ===
   DATABASE_URI: Set (mongodb+srv://...) or MISSING
   PAYLOAD_SECRET: Set or MISSING
   ```

3. **Common Error Messages:**
   - `DATABASE_URI: MISSING` → Environment variable not set
   - `MongoDB connection error` → Network access issue or wrong connection string
   - `Authentication failed` → Wrong username/password in connection string

### 4. Verify Connection String Format

Your connection string should be exactly:
```
mongodb+srv://ojvwebdesign_db_user:YOUR_PASSWORD@cluster0.xom7zf6.mongodb.net/dog-breeding-website?retryWrites=true&w=majority
```

**Check:**
- ✅ Username is correct: `ojvwebdesign_db_user`
- ✅ Password is correct (not x's)
- ✅ Database name is included: `/dog-breeding-website`
- ✅ Query parameters are present: `?retryWrites=true&w=majority`

### 5. Test the API Directly

1. **Visit your API endpoint:**
   ```
   https://your-project.vercel.app/api/puppies
   ```

2. **Expected Results:**
   - ✅ **Success:** You see JSON data with your puppies
   - ❌ **Error:** Check the response and function logs

3. **Common API Responses:**
   - `500 Internal Server Error` → Check function logs
   - `{"error": "Internal server error"}` → Check function logs
   - Empty array `[]` → Database connected but no data (check if data exists)
   - Connection timeout → MongoDB Atlas network access issue

### 6. Verify Database User Permissions

1. **Go to MongoDB Atlas:**
   - Database Access → Find your user (`ojvwebdesign_db_user`)
   - Click Edit (pencil icon)

2. **Check Permissions:**
   - User should have **Read and write** access
   - Database: `dog-breeding-website` (or `admin` for full access)

### 7. Force Redeploy After Environment Variable Changes

**Important:** Environment variable changes require a new deployment:

1. **Option 1: Automatic**
   - Push a new commit to trigger deployment
   - Environment variables will be included

2. **Option 2: Manual Redeploy**
   - Vercel Dashboard → Deployments
   - Click three dots (⋯) on latest deployment
   - Click **Redeploy**
   - Make sure to select **Use existing Build Cache** = OFF (to ensure fresh build)

### 8. Quick Checklist

Before asking for help, verify:

- [ ] `DATABASE_URI` is set in Vercel with your actual password (not x's)
- [ ] All environment variables are set for **Production** environment
- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs)
- [ ] You've redeployed after setting environment variables
- [ ] Connection string includes database name: `/dog-breeding-website`
- [ ] Connection string format is correct (no extra spaces or characters)
- [ ] Checked Vercel function logs for specific error messages

### 9. Still Not Working?

If you've checked everything above:

1. **Share the Vercel Function Logs:**
   - Go to Functions tab → Click on a function execution
   - Copy the full log output
   - Look for the `=== Payload Initialization ===` section

2. **Test Connection String Locally:**
   - Make sure the exact connection string from Vercel works locally
   - Try it in a new terminal: `mongosh "your-connection-string"`

3. **Check MongoDB Atlas Status:**
   - Make sure your cluster is running
   - Check for any service alerts

