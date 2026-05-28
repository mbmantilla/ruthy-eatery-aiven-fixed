import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";

// Load .env in local development. Render/Aiven environment variables are read automatically.
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_NAME = process.env.ADMIN_NAME || "Super Admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD || "user123";

const defaultData = {
  hero: {
    title: "Experience the Art of Fine Dining",
    subtitle:
      "From locally sourced ingredients to masterfully crafted recipes, Ruthy Eatery offers a culinary journey you won't forget.",
    bgImage: "/images/hero-eatery.jpg",
  },
  about: {
    title: "About Us",
    subtitle: "A Legacy of Flavor and Passion",
    description:
      "Founded in 2015, Ruthy Eatery began with a simple mission: to bring honest, high-quality food to our community. Every dish we serve is a testament to our dedication to fresh ingredients and traditional techniques with a modern twist.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    storyTitle: "Our Culinary Journey",
    storyContent:
      "Our story started in a small kitchen with a big dream. We believe that great food comes from the heart, and every recipe we share is a piece of our heritage. From the first sizzle of the pan to the final garnish, we pour our passion into every plate. Join us as we continue to write our flavorful story, one guest at a time.",
  },
  menu: [
    {
      category: "Food",
      description: "Hearty main courses prepared with the finest locally sourced ingredients.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      items: [
        {
          name: "Grilled Ribeye",
          description: "12oz grass-fed beef with garlic herb butter.",
          price: "₱1,850",
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Pan-Seared Salmon",
          description: "Wild-caught salmon with asparagus and lemon risotto.",
          price: "₱950",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Herb Roasted Chicken",
          description: "Free-range chicken with root vegetables and pan jus.",
          price: "₱720",
          image:
            "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
    {
      category: "Drinks",
      description: "Craft cocktails, artisanal spirits, and a curated selection of fine wines.",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
      items: [
        {
          name: "Signature Old Fashioned",
          description: "Bourbon, house-made bitters, orange peel.",
          price: "₱450",
          image:
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Elderflower Spritz",
          description: "Gin, elderflower liqueur, prosecco, soda.",
          price: "₱480",
          image:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Artisan Espresso Martini",
          description: "Fresh espresso, vodka, coffee liqueur.",
          price: "₱420",
          image:
            "https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
    {
      category: "Desserts",
      description: "Exquisite sweet endings handcrafted by our pastry chef daily.",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
      items: [
        {
          name: "Lava Cake",
          description: "Warm chocolate center with vanilla bean gelato.",
          price: "₱350",
          image:
            "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Lemon Tart",
          description: "Shortbread crust with zesty lemon curd and berries.",
          price: "₱280",
          image:
            "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Tiramisu",
          description: "Classic Italian style with espresso-soaked ladyfingers.",
          price: "₱320",
          image:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
  ],
  theme: {
    bgColor: "#ffffff",
    accentColor: "#d97706",
    textColor: "#111827",
  },
  contact: {
    phone: "(02) 8123-4567",
    email: "hello@ruthyeatery.com",
    address: "123 Makati Avenue, Makati City, Metro Manila",
  },
  settings: {
    deliveryEnabled: true,
    pickupEnabled: true,
    deliveryFee: "₱50.00",
    minOrder: "₱500.00",
  },
  messages: [],
  bookings: [],
  orders: [],
  users: [
    {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "admin",
      registeredAt: new Date().toISOString(),
    },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const mergeSiteData = (incoming = {}) => ({
  ...clone(defaultData),
  ...incoming,
  hero: { ...defaultData.hero, ...(incoming.hero || {}) },
  about: { ...defaultData.about, ...(incoming.about || {}) },
  theme: { ...defaultData.theme, ...(incoming.theme || {}) },
  contact: { ...defaultData.contact, ...(incoming.contact || {}) },
  settings: { ...defaultData.settings, ...(incoming.settings || {}) },
  menu: Array.isArray(incoming.menu) ? incoming.menu : clone(defaultData.menu),
  messages: Array.isArray(incoming.messages) ? incoming.messages : [],
  bookings: Array.isArray(incoming.bookings) ? incoming.bookings : [],
  orders: Array.isArray(incoming.orders) ? incoming.orders : [],
  users: Array.isArray(incoming.users) && incoming.users.length ? incoming.users : clone(defaultData.users),
});

const dataForConfig = (data) => ({
  hero: data.hero,
  about: data.about,
  menu: data.menu,
  theme: data.theme,
  contact: data.contact,
  settings: data.settings,
});

const mysqlConfigFromEnv = () => {
  const uri = process.env.AIVEN_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;

  if (uri) {
    const parsed = new URL(uri);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, "") || process.env.MYSQL_DATABASE || "defaultdb",
    };
  }

  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  };
};

const dbConfig = mysqlConfigFromEnv();
const hasDbConfig = Boolean(dbConfig.host && dbConfig.user && dbConfig.database);

const sslConfig = () => {
  const ca = process.env.MYSQL_SSL_CA || process.env.AIVEN_CA_CERT;
  if (process.env.MYSQL_SSL_DISABLED === "true") return undefined;
  return {
    rejectUnauthorized: process.env.MYSQL_SSL_REJECT_UNAUTHORIZED === "true",
    ...(ca ? { ca } : {}),
  };
};

const pool = hasDbConfig
  ? mysql.createPool({
      ...dbConfig,
      ssl: sslConfig(),
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
      queueLimit: 0,
      enableKeepAlive: true,
    })
  : null;

const requireDb = () => {
  if (!pool) {
    const err = new Error(
      "Database is not configured. Add AIVEN_URL or MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, and MYSQL_PORT environment variables."
    );
    err.statusCode = 503;
    throw err;
  }
  return pool;
};

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`scrypt$${salt}$${derivedKey.toString("hex")}`);
    });
  });

const verifyPassword = (password, storedHash) =>
  new Promise((resolve) => {
    if (!storedHash || !storedHash.startsWith("scrypt$")) return resolve(false);
    const [, salt, key] = storedHash.split("$");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return resolve(false);
      try {
        const storedKey = Buffer.from(key, "hex");
        resolve(storedKey.length === derivedKey.length && crypto.timingSafeEqual(storedKey, derivedKey));
      } catch {
        resolve(false);
      }
    });
  });

const toIso = (value) => {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  return String(value);
};

const safeJsonParse = (value, fallback) => {
  try {
    if (!value) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const getColumns = async (tableName) => {
  const db = requireDb();
  const [rows] = await db.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [tableName]
  );
  return new Set(rows.map((row) => row.COLUMN_NAME));
};

const tableExists = async (tableName) => {
  const db = requireDb();
  const [rows] = await db.query(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [tableName]
  );
  return rows.length > 0;
};

const addColumnIfMissing = async (tableName, columnName, definition) => {
  const columns = await getColumns(tableName);
  if (!columns.has(columnName)) {
    await requireDb().query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
};

const selectExpr = (columns, names, fallbackSql) => {
  const found = names.find((name) => columns.has(name));
  return found ? `\`${found}\`` : fallbackSql;
};

const migrateLegacyOrdersIfNeeded = async () => {
  if (!(await tableExists("orders"))) return;
  const columns = await getColumns("orders");
  if (!columns.has("order_id") || columns.has("id")) return;

  await requireDb().query(`
    CREATE TABLE IF NOT EXISTS orders_migrated (
      id VARCHAR(80) PRIMARY KEY,
      user_id VARCHAR(255),
      customer_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      order_type VARCHAR(50) DEFAULT 'pickup',
      address TEXT,
      items_json LONGTEXT,
      total DECIMAL(10,2) DEFAULT 0,
      status VARCHAR(50) DEFAULT 'pending',
      created_at VARCHAR(100)
    )
  `);

  const idExpr = selectExpr(columns, ["order_id"], "UUID()");
  const userExpr = selectExpr(columns, ["user_id"], "''");
  const nameExpr = selectExpr(columns, ["customer_name"], "'Guest'");
  const phoneExpr = selectExpr(columns, ["phone"], "''");
  const typeExpr = selectExpr(columns, ["order_type", "type"], "'pickup'");
  const addressExpr = selectExpr(columns, ["address"], "NULL");
  const itemsExpr = selectExpr(columns, ["items_json"], "'[]'");
  const totalExpr = selectExpr(columns, ["total", "total_amount"], "0");
  const statusExpr = selectExpr(columns, ["status"], "'pending'");
  const createdExpr = selectExpr(columns, ["created_at"], "NOW()");

  await requireDb().query(`
    INSERT IGNORE INTO orders_migrated
      (id, user_id, customer_name, phone, order_type, address, items_json, total, status, created_at)
    SELECT ${idExpr}, ${userExpr}, ${nameExpr}, ${phoneExpr}, ${typeExpr}, ${addressExpr}, ${itemsExpr}, ${totalExpr}, ${statusExpr}, ${createdExpr}
    FROM orders
  `);

  await requireDb().query("SET FOREIGN_KEY_CHECKS=0");
  await requireDb().query("DROP TABLE orders");
  await requireDb().query("RENAME TABLE orders_migrated TO orders");
  await requireDb().query("SET FOREIGN_KEY_CHECKS=1");
};

const migrateLegacyBookingsIfNeeded = async () => {
  if (!(await tableExists("bookings"))) return;
  const columns = await getColumns("bookings");
  if (!columns.has("booking_id") || columns.has("id")) return;

  await requireDb().query(`
    CREATE TABLE IF NOT EXISTS bookings_migrated (
      id VARCHAR(80) PRIMARY KEY,
      user_id VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      booking_date VARCHAR(50),
      booking_time VARCHAR(50),
      guests INT DEFAULT 1,
      status VARCHAR(50) DEFAULT 'pending',
      created_at VARCHAR(100)
    )
  `);

  const idExpr = selectExpr(columns, ["booking_id"], "UUID()");
  const userExpr = selectExpr(columns, ["user_id"], "''");
  const nameExpr = selectExpr(columns, ["name", "guest_name"], "'Guest'");
  const emailExpr = selectExpr(columns, ["email"], "''");
  const phoneExpr = selectExpr(columns, ["phone"], "''");
  const dateExpr = selectExpr(columns, ["booking_date", "date"], "''");
  const timeExpr = selectExpr(columns, ["booking_time", "time"], "''");
  const guestsExpr = selectExpr(columns, ["guests"], "1");
  const statusExpr = selectExpr(columns, ["status"], "'pending'");
  const createdExpr = selectExpr(columns, ["created_at"], "NOW()");

  await requireDb().query(`
    INSERT IGNORE INTO bookings_migrated
      (id, user_id, name, email, phone, booking_date, booking_time, guests, status, created_at)
    SELECT ${idExpr}, ${userExpr}, ${nameExpr}, ${emailExpr}, ${phoneExpr}, ${dateExpr}, ${timeExpr}, ${guestsExpr}, ${statusExpr}, ${createdExpr}
    FROM bookings
  `);

  await requireDb().query("SET FOREIGN_KEY_CHECKS=0");
  await requireDb().query("DROP TABLE bookings");
  await requireDb().query("RENAME TABLE bookings_migrated TO bookings");
  await requireDb().query("SET FOREIGN_KEY_CHECKS=1");
};

const initDb = async () => {
  if (!pool) {
    console.warn("Database not configured. The API will return a clear setup error until Aiven credentials are added.");
    return;
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_configs (
        id INT PRIMARY KEY,
        config_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        password_hash VARCHAR(255) NULL,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await addColumnIfMissing("users", "name", "VARCHAR(255) NOT NULL DEFAULT 'Guest'");
    await addColumnIfMissing("users", "role", "VARCHAR(50) NOT NULL DEFAULT 'user'");
    await addColumnIfMissing("users", "password_hash", "VARCHAR(255) NULL");
    await addColumnIfMissing("users", "registered_at", "DATETIME DEFAULT CURRENT_TIMESTAMP");

    await migrateLegacyBookingsIfNeeded();
    await migrateLegacyOrdersIfNeeded();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        date VARCHAR(100),
        is_read TINYINT(1) DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(80) PRIMARY KEY,
        user_id VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        booking_date VARCHAR(50),
        booking_time VARCHAR(50),
        guests INT DEFAULT 1,
        status VARCHAR(50) DEFAULT 'pending',
        created_at VARCHAR(100)
      )
    `);

    await addColumnIfMissing("bookings", "user_id", "VARCHAR(255)");
    await addColumnIfMissing("bookings", "email", "VARCHAR(255)");
    await addColumnIfMissing("bookings", "phone", "VARCHAR(50)");
    await addColumnIfMissing("bookings", "booking_date", "VARCHAR(50)");
    await addColumnIfMissing("bookings", "booking_time", "VARCHAR(50)");
    await addColumnIfMissing("bookings", "guests", "INT DEFAULT 1");
    await addColumnIfMissing("bookings", "status", "VARCHAR(50) DEFAULT 'pending'");
    await addColumnIfMissing("bookings", "created_at", "VARCHAR(100)");

    const bookingColumnsAfterCreate = await getColumns("bookings");
    if (bookingColumnsAfterCreate.has("date")) {
      await pool.query("UPDATE bookings SET booking_date = `date` WHERE (booking_date IS NULL OR booking_date = '') AND `date` IS NOT NULL");
    }
    if (bookingColumnsAfterCreate.has("time")) {
      await pool.query("UPDATE bookings SET booking_time = `time` WHERE (booking_time IS NULL OR booking_time = '') AND `time` IS NOT NULL");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(80) PRIMARY KEY,
        user_id VARCHAR(255),
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        order_type VARCHAR(50) DEFAULT 'pickup',
        address TEXT,
        items_json LONGTEXT,
        total DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'pending',
        created_at VARCHAR(100)
      )
    `);

    await addColumnIfMissing("orders", "user_id", "VARCHAR(255)");
    await addColumnIfMissing("orders", "phone", "VARCHAR(50)");
    await addColumnIfMissing("orders", "order_type", "VARCHAR(50) DEFAULT 'pickup'");
    await addColumnIfMissing("orders", "address", "TEXT");
    await addColumnIfMissing("orders", "items_json", "LONGTEXT");
    await addColumnIfMissing("orders", "total", "DECIMAL(10,2) DEFAULT 0");
    await addColumnIfMissing("orders", "status", "VARCHAR(50) DEFAULT 'pending'");
    await addColumnIfMissing("orders", "created_at", "VARCHAR(100)");

    const orderColumnsAfterCreate = await getColumns("orders");
    if (orderColumnsAfterCreate.has("type")) {
      await pool.query("UPDATE orders SET order_type = `type` WHERE (order_type IS NULL OR order_type = 'pickup') AND `type` IS NOT NULL");
    }
    if (orderColumnsAfterCreate.has("total_amount")) {
      await pool.query("UPDATE orders SET total = total_amount WHERE (total IS NULL OR total = 0) AND total_amount IS NOT NULL");
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(80) NOT NULL,
        item_name VARCHAR(255),
        description TEXT,
        price VARCHAR(50),
        image LONGTEXT,
        quantity INT DEFAULT 1,
        INDEX(order_id)
      )
    `);

    const [configRows] = await pool.query("SELECT id FROM site_configs WHERE id = 1");
    if (configRows.length === 0) {
      const initial = mergeSiteData(defaultData);
      await pool.query("INSERT INTO site_configs (id, config_json) VALUES (1, ?)", [
        JSON.stringify(dataForConfig(initial)),
      ]);
    }

    const adminHash = await hashPassword(ADMIN_PASSWORD);
    await pool.query(
      `INSERT INTO users (email, name, role, password_hash, registered_at)
       VALUES (?, ?, 'admin', ?, NOW())
       ON DUPLICATE KEY UPDATE name = VALUES(name), role = 'admin', password_hash = COALESCE(password_hash, VALUES(password_hash))`,
      [ADMIN_EMAIL, ADMIN_NAME, adminHash]
    );

    console.log("Aiven MySQL tables are ready.");
  } catch (err) {
    console.error("Database initialization error:", err.message);
  }
};

const readSiteData = async () => {
  const db = requireDb();
  const [configRows] = await db.query("SELECT config_json FROM site_configs WHERE id = 1");
  const config = configRows.length ? safeJsonParse(configRows[0].config_json, {}) : {};
  const data = mergeSiteData(config);

  const [users] = await db.query(
    "SELECT email, name, role, registered_at AS registeredAt FROM users ORDER BY registered_at ASC, name ASC"
  );
  const [messages] = await db.query(
    "SELECT id, name, email, subject, message, date, is_read AS isRead FROM messages ORDER BY date DESC"
  );
  const [bookings] = await db.query(
    `SELECT id, user_id AS userId, name, email, phone, booking_date AS date,
            booking_time AS time, guests, status, created_at AS createdAt
     FROM bookings ORDER BY created_at DESC`
  );
  const [orders] = await db.query(
    `SELECT id, user_id AS userId, customer_name AS customerName, phone,
            order_type AS type, address, items_json AS itemsJson, total, status, created_at AS createdAt
     FROM orders ORDER BY created_at DESC`
  );

  data.users = users.map((user) => ({
    ...user,
    role: user.role === "admin" ? "admin" : "user",
    registeredAt: toIso(user.registeredAt),
  }));

  data.messages = messages.map((message) => ({
    ...message,
    isRead: Boolean(message.isRead),
  }));

  data.bookings = bookings.map((booking) => ({
    ...booking,
    guests: Number(booking.guests || 1),
    status: ["pending", "confirmed", "cancelled"].includes(booking.status) ? booking.status : "pending",
    createdAt: toIso(booking.createdAt),
  }));

  data.orders = orders.map((order) => ({
    id: order.id,
    userId: order.userId || "",
    customerName: order.customerName,
    phone: order.phone || "",
    type: order.type === "delivery" ? "delivery" : "pickup",
    address: order.address || undefined,
    items: safeJsonParse(order.itemsJson, []),
    total: Number(order.total || 0),
    status: ["pending", "preparing", "completed", "cancelled"].includes(order.status)
      ? order.status
      : "pending",
    createdAt: toIso(order.createdAt),
  }));

  return data;
};

const persistFullSiteData = async (incoming) => {
  const db = requireDb();
  const data = mergeSiteData(incoming);

  if (!data.users.find((user) => user.email === ADMIN_EMAIL)) {
    data.users.unshift({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "admin",
      registeredAt: new Date().toISOString(),
    });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `INSERT INTO site_configs (id, config_json)
       VALUES (1, ?)
       ON DUPLICATE KEY UPDATE config_json = VALUES(config_json)`,
      [JSON.stringify(dataForConfig(data))]
    );

    const [existingUsers] = await connection.query("SELECT email, password_hash FROM users");
    const existingPasswordByEmail = new Map(existingUsers.map((user) => [user.email, user.password_hash]));

    await connection.query("DELETE FROM order_items");
    await connection.query("DELETE FROM orders");
    await connection.query("DELETE FROM bookings");
    await connection.query("DELETE FROM messages");
    await connection.query("DELETE FROM users");

    for (const user of data.users) {
      if (!user.email) continue;
      const fallbackPassword = user.email === ADMIN_EMAIL ? ADMIN_PASSWORD : DEFAULT_USER_PASSWORD;
      const passwordHash = existingPasswordByEmail.get(user.email) || (await hashPassword(fallbackPassword));
      await connection.query(
        `INSERT INTO users (email, name, role, password_hash, registered_at)
         VALUES (?, ?, ?, ?, ?)`,
        [
          user.email,
          user.name || user.email,
          user.role === "admin" ? "admin" : "user",
          passwordHash,
          user.registeredAt ? new Date(user.registeredAt) : new Date(),
        ]
      );
    }

    for (const message of data.messages) {
      if (!message.id) continue;
      await connection.query(
        `INSERT INTO messages (id, name, email, subject, message, date, is_read)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          message.id,
          message.name || "Guest",
          message.email || "",
          message.subject || "No subject",
          message.message || "",
          message.date || new Date().toISOString(),
          message.isRead ? 1 : 0,
        ]
      );
    }

    for (const booking of data.bookings) {
      if (!booking.id) continue;
      await connection.query(
        `INSERT INTO bookings (id, user_id, name, email, phone, booking_date, booking_time, guests, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.id,
          booking.userId || booking.email || "",
          booking.name || "Guest",
          booking.email || "",
          booking.phone || "",
          booking.date || "",
          booking.time || "",
          Number(booking.guests || 1),
          booking.status || "pending",
          booking.createdAt || new Date().toISOString(),
        ]
      );
    }

    for (const order of data.orders) {
      if (!order.id) continue;
      const items = Array.isArray(order.items) ? order.items : [];
      await connection.query(
        `INSERT INTO orders (id, user_id, customer_name, phone, order_type, address, items_json, total, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          order.id,
          order.userId || "",
          order.customerName || "Guest",
          order.phone || "",
          order.type === "delivery" ? "delivery" : "pickup",
          order.address || null,
          JSON.stringify(items),
          Number(order.total || 0),
          order.status || "pending",
          order.createdAt || new Date().toISOString(),
        ]
      );

      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, item_name, description, price, image, quantity)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            order.id,
            item.name || "Item",
            item.description || "",
            item.price || "₱0",
            item.image || "",
            Number(item.quantity || 1),
          ]
        );
      }
    }

    await connection.commit();
    return data;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const upsertAuthenticatedUser = async ({ email, name, role = "user", password }) => {
  const db = requireDb();
  const passwordHash = await hashPassword(password);
  await db.query(
    `INSERT INTO users (email, name, role, password_hash, registered_at)
     VALUES (?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), password_hash = VALUES(password_hash)`,
    [email, name || email, role === "admin" ? "admin" : "user", passwordHash]
  );
};

const publicUser = (user) => ({
  name: user.name,
  email: user.email,
  role: user.role === "admin" ? "admin" : "user",
});

initDb();

app.get("/api/health", async (_req, res) => {
  try {
    const db = requireDb();
    await db.query("SELECT 1");
    res.json({
      status: "connected",
      database: dbConfig.database,
      host: dbConfig.host,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ status: "error", message: err.message });
  }
});

app.get("/api/data", async (_req, res) => {
  try {
    const data = await readSiteData();
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const data = await persistFullSiteData(req.body || {});
    res.json({ success: true, message: "Saved to Aiven MySQL", data });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const db = requireDb();
    const [existing] = await db.query("SELECT email FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "This email already exists. Please log in instead." });
    }

    await upsertAuthenticatedUser({ email, name: name || "Valued Guest", password, role: "user" });
    res.json({
      success: true,
      user: { name: name || "Valued Guest", email, role: "user" },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const db = requireDb();
    const [rows] = await db.query("SELECT email, name, role, password_hash FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Account not found." });
    }

    const user = rows[0];
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ success: true, user: publicUser(user) });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

// Serve static assets from the React build.
app.use(express.static(path.join(__dirname, "dist")));

// React fallback for client-side routes.
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Ruthy Eatery server running on port ${PORT}`));
