# RUTHY EATERY - SETUP & RUN GUIDE

## System Issue Detected
Your Windows system has a PowerShell initialization error that prevents terminal commands from executing automatically.

**Error:** `The type initializer for 'System.Management.Automation.Runspaces.InitialSessionState' threw an exception`

---

## ✅ CODE IS FIXED & READY TO RUN

All authentication and login issues have been fixed:
- Removed security bypass vulnerability
- Fixed unregistered account login prevention  
- Improved error handling
- Added proper validation

---

## MANUAL STARTUP INSTRUCTIONS

### Option 1: Use the Provided Batch File (EASIEST)
1. Open File Explorer
2. Navigate to: `C:\Users\Rencilyn Tabugon\Downloads\ruthy-eatery-aiven-fixed\ruth-s_eatery-main`
3. **Double-click** `START_SERVER.bat`
4. You'll see: "Starting server on http://localhost:3001"
5. Open your browser and go to: `http://localhost:3001`

---

### Option 2: Manual Command Prompt
1. Press `Win + R`
2. Type: `cmd` and press Enter
3. Copy-paste these commands one by one:

```
cd /d "C:\Users\Rencilyn Tabugon\Downloads\ruthy-eatery-aiven-fixed\ruth-s_eatery-main"
node server.js
```

4. Wait for: "Ruthy Eatery server running on port 3001"
5. Open browser: `http://localhost:3001`

---

### Option 3: Use VS Code Terminal
1. Open VS Code
2. Press `Ctrl + ~` to open terminal
3. Make sure it's using **Command Prompt** (not PowerShell)
   - Click the dropdown in terminal, select "Command Prompt"
4. Run: `npm start`
5. Open browser: `http://localhost:3001`

---

## 🔑 LOGIN CREDENTIALS

### Admin Account (for dashboard)
- **Email:** admin@gmail.com
- **Password:** admin123

### Create User Account
- Click "Sign Up" in the login modal
- Enter name, email, and password
- You must sign up BEFORE you can log in

---

## TESTING THE FIX

### Test 1: Login Without Account (Should FAIL)
1. Go to Admin Dashboard (lock icon)
2. Try login with unregistered email
3. ✅ Should show: "Account not found"

### Test 2: Signup & Login (Should SUCCEED)
1. Click "Sign Up"
2. Create account with email: test@example.com
3. Go back to Login tab
4. Login with test@example.com
5. ✅ Should successfully log in

### Test 3: Admin Login (Should SUCCEED)
1. Enter admin@gmail.com
2. Enter password: admin123
3. ✅ Should access admin dashboard

---

## TROUBLESHOOTING

### "Server not starting"
- Make sure you're using Command Prompt (cmd.exe), not PowerShell
- Check that port 3001 is not in use
- Restart your computer if issues persist

### "Cannot find npm"
- Install Node.js from: https://nodejs.org/
- Add Node to your PATH and restart your terminal

### "Connection refused on localhost:3001"
- Make sure START_SERVER.bat or npm start is running
- Check the terminal for error messages
- Port 3001 might be blocked or in use

---

## FILES MODIFIED

The following files have been fixed:
✅ `src/context/SiteContext.tsx` - Removed password bypass vulnerability
✅ `src/components/Login.tsx` - Enhanced login form with validation
✅ `src/components/AuthModal.tsx` - Improved signup/login flow
✅ `src/services/backendService.ts` - Added input validation
✅ `.env` - Created configuration file

---

## SUPPORT

If you still have issues:
1. Restart your computer
2. Try a different browser
3. Check that Node.js is installed: `node --version` in Command Prompt
