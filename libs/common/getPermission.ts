import cache from '../cache'
import { log } from '../util/log'
import fs from 'fs'

async function getRefererList() {
  const cacheData = await cache.get('refererList')
  if (cacheData) {
    log('命中缓存', 'refererList')
    return cacheData
  } else {
    const folder = require('path').resolve('./config')
    const path = require('path').resolve(`${folder}/referer.conf`)
    let refererList: string[] = []
    let refererConfig = ''
    if (fs.existsSync(folder)) {
      const pathStat = fs.statSync(folder)
      if (pathStat.isFile()) {
        fs.rmSync(folder)
        fs.mkdirSync(folder)
      }
    } else {
      fs.mkdirSync(folder)
    }
    try {
      refererConfig = fs.readFileSync(path, 'utf-8')
    } catch (e) {
      log('出现错误', JSON.stringify(e))
      fs.writeFileSync(path, '', 'utf-8')
    }
    try {
      refererList = refererConfig.trim().split(/\n/)
      await cache.set('refererList', refererList)
      log('写入缓存', 'refererList')
    } catch (e) {
      log('出现错误', JSON.stringify(e))
    }
    return refererList
  }
}

export default async function getPermission(referer: string) {
  const refererList = await getRefererList()
  if (referer) {
    const refererUrl = new URL(referer)
    console.log(refererUrl)
    const { host } = refererUrl
    console.log(host)
    return refererList.some((item: string) => {
      let whiteHost = item
      if (item.startsWith('*.')) {
        whiteHost = whiteHost.replace('*.', '')
      }
      return host.endsWith(whiteHost)
    })
  } else {
    return true
  }
}
