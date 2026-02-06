import 'server-only'

export function getUtcYmd(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function getNextUtcMidnight(date: Date = new Date()): Date {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1, 0, 0, 0, 0))
  return next
}

