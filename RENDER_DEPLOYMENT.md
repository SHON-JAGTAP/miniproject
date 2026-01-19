# BACKEND DEPLOYMENT MANUAL INSTRUCTIONS

## Option 1: Deploy Backend via Render Web Service (Recommended)

1. Create new Web Service on Render
2. Connect your GitHub repo
3. Set these values:
   - **Name**: turf-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

4. Environment Variables:
   ```
   NODE_ENV=production
   DB_HOST=your-mysql-host
   DB_USER=your-db-user
   DB_PASS=your-db-password
   DB_NAME=your-db-name
   SESSION_SECRET=generate-a-random-key
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   GOOGLE_AI_KEY=your-google-ai-key
   ```

5. Create MySQL database separately and get connection details

6. Deploy!

## Option 2: Deploy via Docker

If Render's Web Service has issues:

1. Use Render's Docker deployment option
2. Point to: `backend/dockerfile`
3. Set the same environment variables above
