import cache from "../utils/cache.js"

export const cacheMiddleware = (keyBuilder, ttl = 120) => {
  return (req, res, next) => {
    const key = typeof keyBuilder === "function"
      ? keyBuilder(req)
      : keyBuilder

    const cachedData = cache.get(key)
    if (cachedData) {
      return res.status(200).json({
        source: "cache",
        data: cachedData,
        message: "Success get data"
      })
    }

    // override res.json untuk simpan cache
    const originalJson = res.json.bind(res)

    res.json = (body) => {
      if (body?.data) {
        cache.set(key, body.data, ttl)
      }
      return originalJson(body)
    }

    next()
  }
}