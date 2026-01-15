import cache from "../utils/cache.js"

export const clearCache = (keys) => {
  return (req, res, next) => {
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        keys.forEach((key) => cache.del(key))
      }
    })
    next()
  }
}