# How to Find Your MongoDB Connection String

## Step-by-Step Guide

### 1. Log in to MongoDB Atlas

1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign in with your MongoDB Atlas account

### 2. Navigate to Your Cluster

1. Once logged in, you'll see your **Clusters** dashboard
2. Find your cluster (likely named something like "Cluster0")
3. Click on the cluster name or the **Connect** button

### 3. Get the Connection String

1. In the connection dialog, you'll see several connection options:
   - **Connect your application**
   - **Connect using MongoDB Compass**
   - **Connect using VS Code**
   - **Connect using MongoDB Shell**

2. Click **"Connect your application"** (or **"Connect"** → **"Connect your application"**)

3. You'll see a connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Important:** Replace `<username>` and `<password>` with your actual credentials:
   - `<username>` should be your database user (e.g., `ojvwebdesign_db_user`)
   - `<password>` should be your database user's password

5. **Add your database name** to the connection string:
   - The connection string will have `/?retryWrites=true&w=majority` at the end
   - Change it to: `/dog-breeding-website?retryWrites=true&w=majority`
   - Or add `?retryWrites=true&w=majority` after the database name if it's not there

### 4. Final Connection String Format

Your complete connection string should look like:
```
mongodb+srv://ojvwebdesign_db_user:YOUR_PASSWORD@cluster0.xom7zf6.mongodb.net/dog-breeding-website?retryWrites=true&w=majority
```

## Alternative: Find Your Database User

If you need to find or reset your database user password:

1. In MongoDB Atlas, go to **Database Access** (left sidebar)
2. You'll see a list of database users
3. Find your user (e.g., `ojvwebdesign_db_user`)
4. Click the **Edit** button (pencil icon)
5. You can:
   - View the username
   - Reset the password if needed
   - See user permissions

## Quick Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Found your cluster
- [ ] Clicked "Connect" → "Connect your application"
- [ ] Copied the connection string
- [ ] Replaced `<username>` with your actual username
- [ ] Replaced `<password>` with your actual password
- [ ] Added `/dog-breeding-website` before the `?` in the connection string
- [ ] Verified the connection string format is correct

## Security Note

⚠️ **Never share your connection string publicly!** It contains your database credentials. Only use it in:
- Your local `.env` file (which is in `.gitignore`)
- Vercel environment variables (which are encrypted)

