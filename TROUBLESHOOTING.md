# Troubleshooting Guide - Product Types Not Working

## Quick Diagnostic Steps

### Step 1: Test MongoDB Connection

Open this URL in your browser while the dev server is running:
```
http://localhost:3000/api/test-db
```

**Expected Result:** 
```json
{
  "success": true,
  "message": "MongoDB connection successful!",
  "database": "project-tracker",
  "collections": ["projects", "productTypes"],
  "timestamp": "..."
}
```

**If you see an error:** Your MongoDB connection is not working properly.

### Step 2: Check Browser Console

1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Refresh the page
4. Look for these messages:
   - `Fetched product types: [...]` ← Should see an array of product types
   - Any red error messages

### Step 3: Check the Network Tab

1. In Developer Tools, go to the **Network** tab
2. Refresh the page
3. Look for the request to `/api/product-types`
4. Click on it and check:
   - **Status**: Should be `200 OK`
   - **Response**: Should show an array of product types

## Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Symptoms:**
- `/api/test-db` returns an error
- Console shows connection errors
- Product types don't load

**Solutions:**

#### A. Verify `.env.local` file
```bash
# Make sure this file exists in the project root
cat .env.local
```

Should show:
```
MONGODB_URI=mongodb+srv://ojvwebdesign_db_user:Daniel2025@cluster0.wx9rjez.mongodb.net/project-tracker?retryWrites=true&w=majority&appName=Cluster0
```

#### B. Restart the dev server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

⚠️ **Important:** Changes to `.env.local` require a server restart!

#### C. Check MongoDB Atlas IP Whitelist
1. Go to MongoDB Atlas dashboard
2. Click "Network Access" in left sidebar
3. Make sure your IP is whitelisted or add `0.0.0.0/0` for development

#### D. Verify Database User Credentials
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Check that user `ojvwebdesign_db_user` exists
4. If needed, reset the password and update `.env.local`

### Issue 2: Empty Product Types

**Symptoms:**
- Page loads but shows "No product types yet"
- `/api/test-db` works fine

**Solution:**
The API should auto-initialize default product types. Try this:

1. Open: http://localhost:3000/api/product-types
2. You should see an array of product types
3. If it's empty `[]`, the database is connected but no data exists
4. Try adding a product type manually through the UI

### Issue 3: Can't Add Product Types

**Symptoms:**
- Click "Add" but nothing happens
- Console shows errors

**Check:**
1. Make sure the input field is not empty
2. Check console for error messages
3. Check Network tab for the POST request status

### Issue 4: Can't Delete Product Types

**Symptoms:**
- Click X button but type doesn't delete
- Console shows errors

**Check:**
1. Make sure you confirm the deletion dialog
2. Check console for error messages
3. Check Network tab for the DELETE request status

## Debug Commands

### Test API Endpoints Manually

```bash
# Test GET product types
curl http://localhost:3000/api/product-types

# Test POST product type
curl -X POST http://localhost:3000/api/product-types \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Type"}'

# Test database connection
curl http://localhost:3000/api/test-db
```

## Still Not Working?

### Full Reset Steps

1. **Stop the dev server** (Ctrl+C)

2. **Clear Next.js cache:**
```bash
rm -rf .next
```

3. **Verify environment file:**
```bash
cat .env.local
# Should show your MongoDB URI
```

4. **Restart server:**
```bash
npm run dev
```

5. **Check all three endpoints:**
   - http://localhost:3000 (main app)
   - http://localhost:3000/api/test-db (connection test)
   - http://localhost:3000/api/product-types (product types API)

6. **Check browser console** for detailed error messages

### Get More Details

Add this temporarily to see what's happening:

In the browser console, run:
```javascript
// Test fetch product types
fetch('/api/product-types')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test database
fetch('/api/test-db')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## What to Check

✅ MongoDB URI in `.env.local` (with database name)  
✅ Dev server restarted after changing `.env.local`  
✅ IP whitelisted in MongoDB Atlas  
✅ Database user exists and password is correct  
✅ Browser console open to see errors  
✅ Network tab open to see API requests  

## Expected Console Output (When Working)

When you load the page, you should see:
```
Fetched product types: [{_id: "...", name: "BESS Foundation", ...}, ...]
Fetched projects: [...]
```

When you add a product type:
```
Added product type: {_id: "...", name: "Your Type Name", ...}
```

When you delete a product type:
```
Deleted product type: 507f1f77bcf86cd799439011
```

## Need More Help?

Share:
1. Output from http://localhost:3000/api/test-db
2. Browser console errors (screenshot)
3. Network tab screenshot showing `/api/product-types` request

