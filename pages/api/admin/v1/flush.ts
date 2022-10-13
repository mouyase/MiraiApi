import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

const path = require('path').resolve('./images')

const html404 = `<html><head><title>404 Not Found</title></head><body><h1 style="text-align: center">404 Not Found</h1><hr><div style="text-align: center">MiraiApi</div></body></html>`

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pathStat = fs.statSync(path)
    if (pathStat?.isDirectory()) {
      const pathList = fs
        .readdirSync(path)
        .filter(item => fs.statSync(`${path}/${item}`)?.isDirectory())
        .map(item => ({ year: item, path: `${path}/${item}` }))
        .filter(item => fs.statSync(item.path)?.isDirectory())
        .map(item => {
          /** 遍历年目录，获取月目录地址 */
          const path = item.path
          return {
            ...item,
            items: fs
              .readdirSync(item.path)
              .filter(item => fs.statSync(`${path}/${item}`)?.isDirectory())
              .map(item => ({ month: item, path: `${path}/${item}` }))
              .filter(item => fs.statSync(item.path)?.isDirectory())
              .map(item => {
                /** 遍历月目录，获取图片文件地址 */
                const path = item.path
                return {
                  ...item,
                  items: fs
                    .readdirSync(path)
                    .filter(item => fs.statSync(`${path}/${item}`)?.isFile())
                    .map(item => `${path}/${item}`)
                }
              })
          }
        })
      fs.writeFileSync(`${path}/index.json`, JSON.stringify(pathList), 'utf-8')
      res.status(200).json(pathList)
    }
  } catch (e) {
    res.status(404).send(e)
  }
}
