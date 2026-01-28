import pinoHttp from 'pino-http'
import logger from '../utils/logger.js'

export const httpLogger = pinoHttp({
  logger,
  customLogLevel: function(req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },
})