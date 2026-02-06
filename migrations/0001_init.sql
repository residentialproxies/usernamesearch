-- D1 Migration: initial schema for UsernameSearch.io

-- Users (Google OAuth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  picture_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  last_login_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan ON users(plan);

-- Daily usage counters (for free plan limits)
CREATE TABLE IF NOT EXISTS user_daily_usage (
  user_id TEXT NOT NULL,
  ymd TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, ymd),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_daily_usage_ymd ON user_daily_usage(ymd);

-- Pro API keys (persistent replacement for in-memory Map)
CREATE TABLE IF NOT EXISTS api_keys (
  key TEXT PRIMARY KEY,
  owner_email TEXT NOT NULL,
  user_id TEXT,
  credits INTEGER NOT NULL,
  used_credits INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  payment_id TEXT UNIQUE,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_api_keys_owner_email ON api_keys(owner_email);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);

-- Payments / webhooks (NowPayments)
CREATE TABLE IF NOT EXISTS payments (
  order_id TEXT PRIMARY KEY,
  invoice_id TEXT,
  email TEXT NOT NULL,
  status TEXT NOT NULL,
  raw_json TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
