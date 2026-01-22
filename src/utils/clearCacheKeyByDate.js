import cache from "./cache.js"

export const clearCacheKeyTransactionDate = () => {
  cache.keys()
    .filter(key => key.startsWith('transaction-date:'))
    .forEach(key => cache.del(key))
}