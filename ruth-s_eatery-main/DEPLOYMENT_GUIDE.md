# RUTHY EATERY - COMPLETE DEPLOYMENT GUIDE

## 📋 TABLE OF CONTENTS
1. [Local Setup](#local-setup)
2. [GitHub Setup](#github-setup)
3. [Aiven MySQL Setup](#aiven-mysql-setup)
4. [MySQL Workbench Setup](#mysql-workbench-setup)
5. [Render Deployment](#render-deployment)

---

## 🏠 LOCAL SETUP

### Step 1: Install Prerequisites
- **Node.js 20.x**: https://nodejs.org/
- **npm 10.x**: Comes with Node.js
- **Git**: https://git-scm.com/
- **MySQL Workbench** (Optional): https://dev.mysql.com/downloads/workbench/

### Step 2: Run Complete Setup
Double-click: `SETUP_AND_RUN.bat`

This will:
1. Install all npm dependencies
2. Build the React frontend
3. Start the server on http://localhost:3001

### Step 3: Access the Application
Open browser: **http://localhost:3001**

### Step 4: Test Login
**Admin Account:**
- Email: `admin@gmail.com`
- Password: `admin123`

**Create Test Account:**
1. Click "Sign Up"
2. Enter name, email, password
3. Go back to "Login" 
4. Use your test account to login

---

## 🐙 GITHUB SETUP

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository named: `ruthy-eatery`
3. Choose "Public" or "Private"
4. Click "Create repository"

### Step 2: Initialize Git Locally
```
cd "C:\Users\Rencilyn Tabugon\Downloads\ruthy-eatery-aiven-fixed\ruth-s_eatery-main"
git init
git add .
git commit -m "Initial commit: Ruthy Eatery application"
```

### Step 3: Connect to GitHub
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ruthy-eatery.git
git push -u origin main
```

### Step 4: Verify
Go to https://github.com/YOUR_GITHUB_USERNAME/ruthy-eatery
You should see all your files there.

---

## 📊 AIVEN MYSQL SETUP

### Step 1: Create Aiven Account
1. Go to https://aiven.io/
2. Sign up for free account
3. Verify email

### Step 2: Create MySQL Service
1. Click "Create a new service"
2. Select "MySQL"
3. Choose:
   - **Cloud**: AWS (or your preference)
   - **Region**: Closest to you
   - **Plan**: Free Tier (mysql-5-hobby)
4. Name it: `ruthy-eatery-db`
5. Click "Create service"

### Step 3: Wait for Service to Start
- Status will change from "BUILDING" to "RUNNING" (takes 2-3 minutes)

### Step 4: Get Connection Details
1. Go to your MySQL service
2. Click "Connection information"
3. Copy the **Service URI** (looks like):
   ```
   mysql://avnadmin:PASSWORD@HOST.aivencloud.com:PORT/defaultdb
   ```

### Step 5: Update .env File
Edit `.env` in your project folder:

```
AIVEN_URL=mysql://avnadmin:YOUR_PASSWORD@YOUR_HOST.aivencloud.com:YOUR_PORT/defaultdb?ssl-mode=REQUIRED
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
DEFAULT_USER_PASSWORD=user123
PORT=3001
```

Replace `YOUR_PASSWORD`, `YOUR_HOST`, `YOUR_PORT` with actual values from Aiven.

### Step 6: Test Connection Locally
Run `SETUP_AND_RUN.bat` - if it shows "Aiven MySQL tables are ready" in the console, you're connected!

---

## 💾 MYSQL WORKBENCH SETUP

### Step 1: Download & Install
https://dev.mysql.com/downloads/workbench/

### Step 2: Create New Connection
1. Open MySQL Workbench
2. Click **+** next to "MySQL Connections"
3. Fill in:
   - **Connection Name**: Ruthy Eatery Aiven
   - **Hostname**: Your Aiven host (from Connection Info)
   - **Port**: Your Aiven port
   - **Username**: avnadmin
   - **Password**: Your Aiven password
   - **Default Schema**: defaultdb

### Step 3: Configure SSL
1. Click "Advanced Options"
2. Scroll down to "SSL Mode"
3. Set to: **REQUIRED** or **VERIFY_IDENTITY**
4. For SSL CA, download from Aiven:
   - In Aiven dashboard: Connection Info → CA Certificate
   - Save as `ca.pem`
   - Browse to it in Workbench

### Step 4: Test Connection
Click "Test Connection" - should say "Successfully made the MySQL connection"

### Step 5: View Data
1. Double-click the connection to connect
2. Expand "defaultdb" schema
3. View tables:
   - `users` - All registered accounts
   - `bookings` - Restaurant reservations
   - `orders` - Food orders
   - `messages` - Contact form messages

---

## 🚀 RENDER DEPLOYMENT

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up (can use GitHub account)
3. Verify email

### Step 2: Deploy Web Service
1. Click "New +"
2. Select "Web Service"
3. Choose:
   - **Repository**: Select your GitHub repo (authorize if needed)
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or Starter for better uptime)

### Step 3: Set Environment Variables
In Render dashboard, go to "Environment":

```
AIVEN_URL=mysql://avnadmin:YOUR_PASSWORD@YOUR_HOST.aivencloud.com:YOUR_PORT/defaultdb?ssl-mode=REQUIRED
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
DEFAULT_USER_PASSWORD=user123
PORT=3001
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. You'll get a URL like: `https://ruthy-eatery.onrender.com`

### Step 5: Test Deployed App
Open: `https://ruthy-eatery.onrender.com`

Log in with:
- Email: `admin@gmail.com`
- Password: `admin123`

### Step 6: Auto-Deploy on Git Push
Now every time you push to GitHub main branch, Render automatically deploys!

---

## 🔄 WORKFLOW SUMMARY

### Local Development
```
1. Edit code
2. Run: SETUP_AND_RUN.bat
3. Test on http://localhost:3001
```

### Deploy to Production
```
1. Commit changes: git commit -m "message"
2. Push to GitHub: git push
3. Render auto-deploys (watch dashboard)
4. Test on your Render URL
```

---

## ✅ CHECKLIST

- [ ] Node.js installed
- [ ] Project runs locally with SETUP_AND_RUN.bat
- [ ] GitHub repository created and synced
- [ ] Aiven MySQL service running
- [ ] .env file configured with Aiven credentials
- [ ] MySQL Workbench connected to Aiven
- [ ] Render account created
- [ ] Render Web Service deployed
- [ ] Can login to admin@gmail.com on Render
- [ ] Can create new user accounts
- [ ] Can see data in MySQL Workbench

---

## 🆘 TROUBLESHOOTING

### Server won't start locally
```
1. Delete node_modules folder
2. Run: npm install
3. Run: npm run build
4. Run: node server.js
```

### Connection to Aiven fails
```
1. Check .env file has correct AIVEN_URL
2. Verify credentials in Aiven dashboard
3. Make sure SSL is REQUIRED in connection string
4. Test in MySQL Workbench first
```

### Render deployment fails
```
1. Check Render logs in dashboard
2. Verify environment variables are set
3. Make sure package.json has all dependencies
4. Test locally first
```

### MySQL Workbench connection fails
```
1. Get fresh credentials from Aiven
2. Download latest CA certificate
3. Make sure SSL Mode is REQUIRED
4. Check firewall allows outbound connections
```

---

## 📚 ADDITIONAL RESOURCES

- **Aiven Docs**: https://docs.aiven.io/docs/products/mysql
- **Render Docs**: https://render.com/docs
- **MySQL Workbench**: https://dev.mysql.com/doc/workbench/en/
- **Node.js**: https://nodejs.org/docs/
- **GitHub**: https://docs.github.com/

---

## ✨ FEATURES IMPLEMENTED

✅ User authentication (login/signup)  
✅ Admin dashboard  
✅ Menu management  
✅ Restaurant bookings  
✅ Online orders  
✅ Contact messages  
✅ Responsive design  
✅ MySQL database  
✅ Secure password hashing  
✅ Session management  

---

**Last Updated:** May 26, 2026  
**Status:** Production Ready ✅
