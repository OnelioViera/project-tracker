# 🚀 Quick Start - 3 Steps to Get Running

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create a **FREE** account and cluster
3. Get your connection string (click Connect → Connect your application)
4. Copy `.env.local.example` to `.env.local` and add your connection string:

```bash
# In .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-tracker?retryWrites=true&w=majority
```

## Step 3: Run the App
```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## MongoDB Atlas Quick Setup

**Create Account**: https://cloud.mongodb.com

**Get Connection String**:
1. Clusters → Connect
2. Connect your application
3. Copy the connection string
4. Replace `<password>` with your DB password
5. Replace `<database>` with `project-tracker`

**Whitelist IP**:
- For dev: `0.0.0.0/0` (all IPs)
- For prod: Your specific IP address

---

## That's It! 

Your app is now running with:
- ✅ Full CRUD operations for projects
- ✅ Product type management
- ✅ Status filtering
- ✅ Beautiful shadcn/ui components
- ✅ MongoDB Atlas database
- ✅ Responsive design

See `README.md` for detailed documentation and `SETUP.md` for troubleshooting.

