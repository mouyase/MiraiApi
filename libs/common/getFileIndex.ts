import cache from '../cache'
import { log } from '../util/log'
import fs from 'fs'

export default async function getFileIndex() {
  const cacheData = await cache.get('fileIndex')
  if (cacheData) {
    log('命中缓存', 'fileIndex')
    return cacheData
  } else {
    const path = require('path').resolve('./images/index.json')
    const fileIndex = JSON.parse(fs.readFileSync(path, 'utf-8'))
    await cache.set('fileIndex', fileIndex)
    log('写入缓存')
    return fileIndex
  }
}
