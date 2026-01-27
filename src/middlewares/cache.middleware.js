import cache from "../utils/cache.js"

export const cacheMiddleware = (keyBuilder, ttl = 120) => {
  return (req, res, next) => {
    const key = typeof keyBuilder === "function"
      ? keyBuilder(req)
      : keyBuilder

    const cachedData = cache.get(key)
    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "cache",
        message: "Success get data",
        ...cachedData
      })
    }

    // override res.json untuk simpan cache
    const originalJson = res.json.bind(res)
    
    res.json = (body) => {
      if (body?.data) {
        cache.set(
          key, 
          {
            data: body.data,
            meta: body.meta
          }, 
          ttl)
      }
      return originalJson(body)
    }

    next()
  }
}