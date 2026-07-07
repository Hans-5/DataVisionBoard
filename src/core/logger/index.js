const LEVELS = { info: 0, warn: 1, error: 2 }
const MIN_LEVEL = import.meta.env.VITE_LOG_LEVEL ?? 'info'

function log(level, ...args) {
  if (LEVELS[level] < LEVELS[MIN_LEVEL]) return
  const prefix = `[${level.toUpperCase()}][${new Date().toISOString()}]`
  // eslint-disable-next-line no-console
  if (level === 'error') console.error(prefix, ...args)
  // eslint-disable-next-line no-console
  else if (level === 'warn') console.warn(prefix, ...args)
  // eslint-disable-next-line no-console
  else console.log(prefix, ...args)
}

export const logger = {
  info: (...a) => log('info', ...a),
  warn: (...a) => log('warn', ...a),
  error: (...a) => log('error', ...a),
}
