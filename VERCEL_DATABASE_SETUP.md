# Vercel Database Setup - Transferring MongoDB Data

## The Issue

Your Vercel deployment isn't showing your MongoDB data because it needs to connect to the **same MongoDB Atlas database** that your local development uses.

## Solution: Use the Same Database

You have two options:

### Option 1: Use the Same MongoDB Atlas Database (Recommended)

**This is the easiest approach** - both your local development and Vercel production will use the same database.

1. **Get your MongoDB Atlas connection string** from your local `.env` file
   - It should look like: `mongodb+srv://username:password@cluster.mongodb.net/dog-breeding-website`

2. **Add it to Vercel Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `DATABASE_URI` = your MongoDB Atlas connection string (same as local)
   - Make sure the database name matches: `dog-breeding-website`

3. **Update MongoDB Atlas Network Access:**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow all IPs (or add Vercel's IP ranges)
   - This allows Vercel to connect to your database

4. **Redeploy on Vercel:**
   - After setting the environment variable, trigger a new deployment
   - Your data should now appear!

### Option 2: Migrate Data to a New Production Database

If you want separate databases for dev and production:

1. Create a new MongoDB Atlas database for production
2. Export data from your local database
3. Import it to the production database
4. Use the production connection string in Vercel

## Quick Checklist

- [ ] `DATABASE_URI` in Vercel matches your local `.env` file
- [ ] Database name in connection string is `dog-breeding-website`
- [ ] MongoDB Atlas Network Access allows Vercel (0.0.0.0/0 or specific IPs)
- [ ] All other environment variables are set in Vercel
- [ ] Redeployed after setting environment variables

## Verify Connection

After redeploying, check:
1. Visit: `https://your-project.vercel.app/admin`
2. Log in with your Payload admin credentials
3. Check if your Puppies, Gallery, Pages, etc. are visible
4. If not, check Vercel function logs for connection errors

## Common Issues

### "Database not found"
- Check the database name in your connection string matches exactly
- MongoDB Atlas database names are case-sensitive

### "Connection timeout"
- Check MongoDB Atlas Network Access settings
- Ensure `0.0.0.0/0` is added or Vercel IPs are whitelisted

### "Authentication failed"
- Verify username and password in connection string are correct
- Check MongoDB Atlas database user permissions

