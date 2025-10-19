# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies (5 minutes)

Open your terminal in this directory and run:

```bash
npm install
```

This will install all required packages including Next.js, React, MongoDB driver, shadcn/ui components, and Tailwind CSS.

### 2. Set Up MongoDB Atlas (10 minutes)

#### Create a Free MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Choose the **FREE** tier (M0 Sandbox)
4. Select your preferred cloud provider and region
5. Click "Create Cluster"

#### Get Your Connection String

1. In your cluster, click **"Connect"**
2. Click **"Connect your application"**
3. Copy the connection string (looks like `mongodb+srv://...`)

#### Configure Database User

1. If you haven't created a database user, MongoDB will prompt you
2. Create a username and strong password
3. **SAVE YOUR PASSWORD** - you'll need it!

#### Whitelist Your IP Address

1. MongoDB Atlas will ask you to add your IP address
2. For development, you can add `0.0.0.0/0` (allows all IPs)
3. For production, use your specific IP address

### 3. Configure Environment Variables (2 minutes)

Edit the `.env.local` file in this directory and replace the placeholder with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-tracker?retryWrites=true&w=majority
```

**Important**: Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- `cluster` with your actual cluster name

### 4. Run the Application (1 minute)

```bash
npm run dev
```

Open your browser to **http://localhost:3000**

## First Time Usage

### Initialize Default Product Types

The first time you load the app, it will automatically create these default product types:
- BESS Foundation
- Solar Equipment
- Utility Vault
- Manhole
- Box Culvert
- Bridge Product
- Storm Sewer
- Sanitary Sewer

You can add, edit, or remove these by clicking "Manage Products".

### Create Your First Project

1. Click **"New Project"** button
2. Fill in the project details:
   - Project Name (required)
   - Client (required)
   - Product Types (optional, select multiple)
   - Deadline (optional)
   - Status (defaults to "Draft")
   - Notes (optional)
3. Click **"Add"**

## Common Issues

### Issue: "Error connecting to MongoDB"

**Solution**: 
- Check your `.env.local` file has the correct connection string
- Verify your MongoDB username and password are correct
- Make sure your IP is whitelisted in MongoDB Atlas
- Restart the dev server after changing `.env.local`

### Issue: "Module not found" errors

**Solution**:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

## Next Steps

1. ✅ Create your first project
2. ✅ Add custom product types
3. ✅ Try filtering by status
4. ✅ Edit and delete projects
5. ✅ Explore all features

## Need Help?

Check the main `README.md` for more detailed information about:
- API documentation
- Project structure
- Customization options
- Deployment instructions

