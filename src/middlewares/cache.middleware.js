import cache from "../utils/cache.js"

export const cacheMiddleware = (keyBuilder, ttl = 120) => {
  console.log(keyBuilder)
  return (req, res, next) => {
    const key = typeof keyBuilder === "function"
      ? keyBuilder(req)
      : keyBuilder

    const cachedData = cache.get(key)
    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: cachedData,
      })
    }

    // override res.json untuk simpan cache
    const originalJson = res.json.bind(res)

    res.json = (body) => {
      if (body?.success) {
        cache.set(key, body.data, ttl)
      }
      return originalJson(body)
    }

    next()
  }
}