# QUICK START GUIDE

## 🚀 Get Running in 30 Seconds

### Option A: Windows (Easiest)
1. **Double-click**: `SETUP_AND_RUN.bat`
2. **Wait** for "Server running on http://localhost:3001"
3. **Open browser**: http://localhost:3001

### Option B: Manual Command Prompt
```
npm install
npm run build
node server.js
```

---

## 🔑 DEFAULT CREDENTIALS

**Admin Dashboard:**
```
Email: admin@gmail.com
Password: admin123
```

**Create User:**
1. Click "Sign Up"
2. Enter name, email, password
3. Login with your credentials

---

## 📁 PROJECT STRUCTURE

```
ruth-s_eatery-main/
├── server.js              ← Backend API
├── package.json           ← Dependencies
├── .env                   ← Configuration
├── src/
│   ├── components/        ← React components
│   ├── pages/            ← Page components
│   ├── services/         ← API service
│   └── context/          ← State management
├── dist/                 ← Built frontend
└── DEPLOYMENT_GUIDE.md   ← Full deployment instructions
```

---

## 🔗 DEPLOYMENT LINKS

- **GitHub**: https://github.com
- **Aiven MySQL**: https://aiven.io
- **Render**: https://render.com
- **MySQL Workbench**: https://dev.mysql.com/downloads/workbench/

---

## ✅ AUTHENTICATION SYSTEM

✅ **Secure Login**: Users must register before logging in
✅ **Password Hashing**: Passwords stored securely (scrypt)
✅ **Session Management**: Login state persists in localStorage
✅ **Admin Dashboard**: Restricted to admin users only
✅ **Error Handling**: Clear messages on auth failures

---

## 📊 DATABASE TABLES

- **users** - User accounts (email, name, role, password hash)
- **bookings** - Restaurant reservations
- **orders** - Food orders
- **messages** - Contact form submissions
- **site_configs** - Website settings

---

## 🐛 COMMON ISSUES

### "Connection Refused" on localhost:3001
→ Run `SETUP_AND_RUN.bat` to start the server

### "Cannot find module" error
→ Run: `npm install`

### "Account not found" when logging in
→ Create account first via "Sign Up" button

### Database not connecting
→ Check `.env` file has correct `AIVEN_URL`

---

## 📞 SUPPORT

See `DEPLOYMENT_GUIDE.md` for complete deployment instructions and troubleshooting.
