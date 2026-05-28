# Ruthy Eatery - Restaurant Management System

Full-stack restaurant website and management system using React, Express, and Aiven MySQL.

## What was fixed

- The backend now uses Aiven MySQL as the main database source.
- Public website records are loaded from `/api/data`, which reads from Aiven tables.
- Admin edits save to Aiven through `/api/data`.
- Orders, reservations, users, and messages are stored in real database tables.
- User signup/login and admin login now use backend auth endpoints.
- Deleted records are also deleted from the database during sync, so old records do not reappear.
- The “Download Full Menu (PDF)” button now opens a printable menu generated from current database records.
- Added Node 20 engine settings to avoid Render/npm issues with newer default Node versions.

## Tech stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- MySQL via `mysql2`
- Aiven MySQL

## Admin account

Default admin login:

```txt
email: admin@gmail.com
password: admin123
```

You can change this using environment variables:

```txt
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=your_new_password
```

## Aiven setup

Use either one Aiven URI:

```txt
AIVEN_URL=mysql://avnadmin:YOUR_PASSWORD@YOUR_HOST.aivencloud.com:YOUR_PORT/defaultdb?ssl-mode=REQUIRED
```

or separate variables:

```txt
MYSQL_HOST=YOUR_HOST.aivencloud.com
MYSQL_PORT=YOUR_PORT
MYSQL_USER=avnadmin
MYSQL_PASSWORD=YOUR_PASSWORD
MYSQL_DATABASE=defaultdb
```

The server creates the needed tables automatically when it starts. You may also run `schema.sql` manually in Aiven Console or MySQL Workbench.

## Local run

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`, then add your Aiven credentials.

3. Build the frontend:

```bash
npm run build
```

4. Start the backend:

```bash
npm start
```

5. Open:

```txt
http://localhost:3001
```

## Render deployment

Use one Render Web Service for the full app.

Recommended settings:

```txt
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

Environment variables:

```txt
AIVEN_URL=mysql://avnadmin:YOUR_PASSWORD@YOUR_HOST.aivencloud.com:YOUR_PORT/defaultdb?ssl-mode=REQUIRED
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
DEFAULT_USER_PASSWORD=user123
```

The project includes:

```txt
.node-version -> 20
package.json engines -> node 20.x / npm 10.x
```

This helps Render avoid the Node 24/npm install error.

## Important notes

- The database is now the source of truth. If Aiven credentials are missing, `/api/health` will show a setup error.
- Admin-created users receive the default password from `DEFAULT_USER_PASSWORD` unless they sign up themselves.
- Uploaded local images are saved as base64 inside the site configuration. For a larger production app, move uploads to Cloudinary or another file storage service.
