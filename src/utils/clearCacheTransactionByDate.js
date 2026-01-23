import cache from "./cache.js"

export const clearCacheTransactionByDate = () => {
  return (req, res, next) => {
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.keys()
          .filter(key => key.startsWith('transaction-date:'))
          .forEach(key => cache.del(key))
      }
    })
    next()
  }
}