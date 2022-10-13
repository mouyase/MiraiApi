import MemoryCache from './memoryCache'

const cache: {
  getCache: (key: string) => any
  setCache: (key: string, value: any) => void
  delCache: (key: string) => void
} = MemoryCache

export default {
  get(key: string) {
    return cache.getCache(key)
  },
  set(key: string, value: any) {
    return cache.setCache(key, value)
  },
  del(key: string) {
    return cache.delCache(key)
  }
}
