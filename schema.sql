-- Ruthy Eatery - Aiven MySQL Schema
-- Run this inside your Aiven MySQL database if you want to create the tables manually.
-- The Node.js server also creates/updates these tables automatically on startup.

CREATE TABLE IF NOT EXISTS site_configs (
  id INT PRIMARY KEY,
  config_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  password_hash VARCHAR(255) NULL,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(80) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date VARCHAR(100),
  is_read TINYINT(1) DEFAULT 0
);

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
);

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
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(80) NOT NULL,
  item_name VARCHAR(255),
  description TEXT,
  price VARCHAR(50),
  image LONGTEXT,
  quantity INT DEFAULT 1,
  INDEX(order_id)
);
