import cache from "../utils/cache.js"

export const clearCache = (prefix) => {
  return (req, res, next) => {
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.keys().filter(key => key.startsWith(prefix)).forEach(key => cache.del(key))
      }
    })
    next()
  }
}