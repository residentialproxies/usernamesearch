-- D1 Migration: Add rate limiting table

-- Rate limiting table for API abuse prevention
CREATE TABLE IF NOT EXISTS rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  identifier TEXT NOT NULL,
  timestamp INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier);
CREATE INDEX IF NOT EXISTS idx_rate_limits_timestamp ON rate_limits(timestamp);
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_timestamp ON rate_limits(identifier, timestamp);
